import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FetchData from "../../Utils/FetchData";
import ProductCard from "./ProductCard";
import { handleResize } from "../../Utils/handleResize";
import MobileProductCardSkeletom from "./ProductCard/MobileProductCard/MobileProductCardSkeletom";
import DesktopProductCardSkeleton from "./ProductCard/DesktopProductCard/desktopProductCardSkeleton";
import ProductsSort from "./ProductsSort";
import DesktopPriceFilter from "./PriceFilter/DesktopPriceFilter";
import ProductsFilters from "./ProductsFilters";
import MobilePriceFilter from "./PriceFilter/MobilePriceFilter";
import { NoScroll } from "../../Utils/NoScroll";

export default function Products() {
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileSize, setIsMobileSize] = useState(window.innerWidth < 640);
  const [hideFilterBox, setHideFilterBox] = useState(window.innerWidth < 1024);
  const [sort, setSort] = useState("-createdAt");
  const [page, setPage] = useState(1);
  const [productCount, setProductCount] = useState(0);
  const { categoryId } = useParams();
  const itemsPerPage = 20;

  // filter states
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentFilterPrice, setCurrentFilterPrice] = useState([0, 999999999]);
  const [priceInputValues, setPriceInputValues] = useState(["", ""]);
  const [overallPriceRange, setOverallPriceRange] = useState([0, 999999999]);

  const totalPages = Math.ceil(productCount / itemsPerPage);

  // mobile filter Box
  const [isFilterBoxVisible, setIsFilterBoxVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleOpenFiterBox = () => {
    setIsFilterBoxVisible(true);
    setIsAnimating(true);
  };

  const handleCloseFilterBox = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsFilterBoxVisible(false);
    }, 400);
  };

  useEffect(() => {
    NoScroll(isFilterBoxVisible, isAnimating);
  }, [isFilterBoxVisible, isAnimating]);

//


  useEffect(() => {
    handleResize(setIsMobileSize, 640);
    handleResize(setHideFilterBox, 1024);
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const apiUrl = `products?${categoryId !== "all" ? `categoryId=${categoryId}&` : ""}page=${page}&limit=${itemsPerPage}&sort=${sort}&populate=defaultProductVariantId,variantIds`;

    (async () => {
      try {
        const result = await FetchData(apiUrl);
        setAllProducts(result.data);
        setProductCount(result.count);

        if (result.data && result.data.length > 0) {
          let min = Infinity;
          let max = -Infinity;

          result.data.forEach((pr) => {
            const finalPrice = pr?.defaultProductVariantId?.priceAfterDiscount;
            if (finalPrice < min) min = finalPrice;
            if (finalPrice > max) max = finalPrice;
          });

          if (min !== Infinity && max !== -Infinity) {
            setOverallPriceRange([min, max]);

            const minStr = String(min);
            const maxStr = String(max);

            setPriceInputValues([minStr, maxStr]);
            setCurrentFilterPrice([min, max]);
          } else {
            setOverallPriceRange([0, 500000000]);
            setPriceInputValues(["", ""]);
            setCurrentFilterPrice([0, 500000000]);
          }
        } else {
          setOverallPriceRange([0, 500000000]);
          setPriceInputValues(["", ""]);
          setCurrentFilterPrice([0, 500000000]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setAllProducts([]);
        setProductCount(0);
        setOverallPriceRange([0, 500000000]);
        setPriceInputValues(["", ""]);
        setCurrentFilterPrice([0, 500000000]);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [page, sort, categoryId]);

  useEffect(() => {
    const filtered = allProducts.filter((pr) => {
      const finalPrice =
        pr?.defaultProductVariantId?.priceAfterDiscount ??
        pr?.defaultProductVariantId?.price ??
        0;
      return (
        currentFilterPrice[0] !== null &&
        currentFilterPrice[1] !== null &&
        finalPrice >= currentFilterPrice[0] &&
        finalPrice <= currentFilterPrice[1]
      );
    });
    setFilteredProducts(filtered);
  }, [allProducts, currentFilterPrice]);

  const handlePriceInputChange = useCallback(
    (index, value) => {
      const newPriceInputValues = [...priceInputValues];

      if (value === "") {
        newPriceInputValues[index] = "";
      } else {
        newPriceInputValues[index] = value;
      }
      setPriceInputValues(newPriceInputValues);
      let min = 0;
      let max = 999999999;

      const minInputValue = newPriceInputValues[0];
      const maxInputValue = newPriceInputValues[1];
      const parsedMin = minInputValue === "" ? null : Number(minInputValue);
      const parsedMax = maxInputValue === "" ? null : Number(maxInputValue);

      if (parsedMin !== null && !isNaN(parsedMin)) {
        min = parsedMin;
      } else if (parsedMax !== null && !isNaN(parsedMax) && index === 1) {
        min = 0;
      }
      if (parsedMax !== null && !isNaN(parsedMax)) {
        max = parsedMax;
      } else if (parsedMin !== null && !isNaN(parsedMin) && index === 0) {
        max = parsedMin;
      }

      if (min > max) {
        max = min;
      }

      setCurrentFilterPrice([min, max]);
      setPage(1);
    },
    [priceInputValues],
  );
 
  const resetPriceFilter = () => {
  const [min, max] = overallPriceRange;

  // مقدار اولیه همان محدوده کلی
  setPriceInputValues([String(min), String(max)]);
  setCurrentFilterPrice([min, max]);

  // بازگشت به صفحه 1
  setPage(1);
};

  const productCards = filteredProducts.map((pr) => (
    <ProductCard
      key={pr._id}
      variantIds={pr.variantIds}
      image={pr.images[0]}
      title={pr.title}
      avgRating={pr.avgRating}
      price={pr?.defaultProductVariantId?.price}
      priceAfterDiscount={pr?.defaultProductVariantId?.priceAfterDiscount}
      discountPercent={pr?.defaultProductVariantId?.discountPercent}
      id={pr._id}
    />
  ));

  const skeleton = Array.from({ length: itemsPerPage }, (_, index) =>
    isMobileSize ? (
      <MobileProductCardSkeletom key={index} />
    ) : (
      <DesktopProductCardSkeleton key={index} />
    ),
  );

  return (
    <div className="mt-25 lg:mt-40 mb-25">
      <div className="flex sm:px-3 lg:px-6 ">
        {!hideFilterBox && (
          <div className="w-90 h-80 bg-white p-4 border border-gray-200 rounded-2xl">
            <DesktopPriceFilter
              priceInputValues={priceInputValues}
              onPriceInputChange={handlePriceInputChange}
              resetPriceFilter={resetPriceFilter}
            />
          </div>
        )}

        <div className="w-full flex flex-col gap-2 px-3">
          <div className="">
            <ProductsSort sort={sort} setSort={setSort} />
            {hideFilterBox && (
              <div className="mt-2">
                <ProductsFilters openFilterBox={handleOpenFiterBox} />
              </div>
            )}
            {hideFilterBox && isFilterBoxVisible == true && (
              <MobilePriceFilter
                isFilterBoxVisible={isAnimating}
                closeFilterBox={handleCloseFilterBox}
                priceInputValues={priceInputValues}
                onPriceInputChange={handlePriceInputChange}
                resetPriceFilter={resetPriceFilter}
              />
            )}
          </div>
          <div className="w-full grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 border-t border-t-gray-200">
            {isLoading ? skeleton : productCards}
          </div>
        </div>
      </div>

      {productCount > itemsPerPage && (
        <div className="flex justify-center items-center mt-8 space-x-4">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className={`px-4 py-2 rounded-lg font-samim font-medium cursor-pointer ${page === 1 ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-teal-600 text-white hover:bg-teal-700"}`}
          >
            قبلی
          </button>

          <span className="text-gray-900 font-bold font-samim">
            صفحه {page} از {totalPages}
          </span>

          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className={`px-4 py-2 rounded-lg font-samim font-medium cursor-pointer ${page === totalPages ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-teal-600 text-white hover:bg-teal-700"}`}
          >
            بعدی
          </button>
        </div>
      )}
    </div>
  );
}

// import React, { useCallback, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import FetchData from "../../Utils/FetchData";
// import ProductCard from "./ProductCard";
// import { handleResize } from "../../Utils/handleResize";
// import MobileProductCardSkeletom from "./ProductCard/MobileProductCard/MobileProductCardSkeletom";
// import DesktopProductCardSkeleton from "./ProductCard/DesktopProductCard/desktopProductCardSkeleton";
// import ProductsSort from "./ProductsSort";

// export default function Products() {
//   const [allProducts, setAllProducts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isMobileSize, setIsMobileSize] = useState(window.innerWidth < 640);
//   const [hideFilterBox, setHideFilterBox] = useState(window.innerWidth < 1024);
//   const [sort, setSort] = useState("-createdAt");
//   const [page, setPage] = useState(1);
//   const [productCount, setProductCount] = useState(0);
//   const { categoryId } = useParams();
//   const itemsPerPage = 20;

//   // filter states
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [currentFilterPrice, setCurrentFilterPrice] = useState([0, 999999999]);
//   const [priceInputValues, setPriceInputValues] = useState(["", ""]);
//   const [overallPriceRange, setOverallPriceRange] = useState([0, 999999999]);

//   const totalPages = Math.ceil(productCount / itemsPerPage);

//   useEffect(() => {
//     handleResize(setIsMobileSize, 640);
//     handleResize(setHideFilterBox, 1024);
//     window.scrollTo(0, 0);
//   }, []);

//   useEffect(() => {
//     setIsLoading(true);
//     const apiUrl = `products?${categoryId !== "all" ? `categoryId=${categoryId}&` : ""}page=${page}&limit=${itemsPerPage}&sort=${sort}&populate=defaultProductVariantId,variantIds`;

//     (async () => {
//       try {
//         const result = await FetchData(apiUrl);
//         setAllProducts(result.data);
//         setProductCount(result.count);

//         if (result.data && result.data.length > 0) {
//           let min = Infinity;
//           let max = -Infinity;

//           result.data.forEach((pr) => {
//             const finalPrice = pr?.defaultProductVariantId?.priceAfterDiscount;
//             if (finalPrice < min) min = finalPrice;
//             if (finalPrice > max) max = finalPrice;
//           });

//           if (min !== Infinity && max !== -Infinity) {
//             setOverallPriceRange([min, max]);

//             const minStr = String(min);
//             const maxStr = String(max);

//             setPriceInputValues([minStr, maxStr]);
//             setCurrentFilterPrice([min, max]);
//           } else {
//             setOverallPriceRange([0, 500000000]);
//             setPriceInputValues(["", ""]);
//             setCurrentFilterPrice([0, 500000000]);
//           }
//         } else {
//           setOverallPriceRange([0, 500000000]);
//           setPriceInputValues(["", ""]);
//           setCurrentFilterPrice([0, 500000000]);
//         }
//       } catch (error) {
//         console.error("Error fetching products:", error);
//         setAllProducts([]);
//         setProductCount(0);
//         setOverallPriceRange([0, 500000000]);
//         setPriceInputValues(["", ""]);
//         setCurrentFilterPrice([0, 500000000]);
//       } finally {
//         setIsLoading(false);
//       }
//     })();
//   }, [page, sort, categoryId]);

//   useEffect(() => {
//     const filtered = allProducts.filter((pr) => {
//       const finalPrice =
//         pr?.defaultProductVariantId?.priceAfterDiscount ??
//         pr?.defaultProductVariantId?.price ??
//         0;
//       return (
//         currentFilterPrice[0] !== null &&
//         currentFilterPrice[1] !== null &&
//         finalPrice >= currentFilterPrice[0] &&
//         finalPrice <= currentFilterPrice[1]
//       );
//     });
//     setFilteredProducts(filtered);
//   }, [allProducts, currentFilterPrice]);

//   const handlePriceInputChange = useCallback(
//     (index, value) => {
//       const newPriceInputValues = [...priceInputValues];

//       if (value === "") {
//         newPriceInputValues[index] = "";
//       } else {
//         newPriceInputValues[index] = value;
//       }
//       setPriceInputValues(newPriceInputValues);
//       let min = 0;
//       let max = 999999999;

//       const minInputValue = newPriceInputValues[0];
//       const maxInputValue = newPriceInputValues[1];
//       const parsedMin = minInputValue === "" ? null : Number(minInputValue);
//       const parsedMax = maxInputValue === "" ? null : Number(maxInputValue);

//       if (parsedMin !== null && !isNaN(parsedMin)) {
//         min = parsedMin;
//       } else if (parsedMax !== null && !isNaN(parsedMax) && index === 1) {
//         min = 0;
//       }
//       if (parsedMax !== null && !isNaN(parsedMax)) {
//         max = parsedMax;
//       } else if (parsedMin !== null && !isNaN(parsedMin) && index === 0) {
//         max = parsedMin;
//       }

//       if (min > max) {
//         max = min;
//       }

//       setCurrentFilterPrice([min, max]);
//       setPage(1);
//     },
//     [priceInputValues],
//   );

//   const productCards = filteredProducts.map((pr) => (
//     <ProductCard
//       key={pr._id}
//       variantIds={pr.variantIds}
//       image={pr.images[0]}
//       title={pr.title}
//       avgRating={pr.avgRating}
//       price={pr?.defaultProductVariantId?.price}
//       priceAfterDiscount={pr?.defaultProductVariantId?.priceAfterDiscount}
//       discountPercent={pr?.defaultProductVariantId?.discountPercent}
//       id={pr._id}
//     />
//   ));

//   const skeleton = Array.from({ length: itemsPerPage }, (_, index) =>
//     isMobileSize ? (
//       <MobileProductCardSkeletom key={index} />
//     ) : (
//       <DesktopProductCardSkeleton key={index} />
//     ),
//   );

//   return (
//     <div className="mt-45 mb-25">
//       <div className="flex sm:px-3 lg:px-6 ">
//         {!hideFilterBox && (
//           <div className="w-90 h-100 bg-amber-100 p-4">
//             <h3 className="font-bold mb-2">فیلتر قیمت</h3>
//             <div className="flex flex-col gap-2">
//               <label htmlFor="min-price-input" className="text-sm">
//                 حداقل قیمت:
//               </label>
//               <input
//                 id="min-price-input"
//                 type="text"
//                 placeholder="Min Price"
//                 value={priceInputValues[0]}
//                 onChange={(e) => handlePriceInputChange(0, e.target.value)}
//                 className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//               <label htmlFor="max-price-input" className="text-sm">
//                 حداکثر قیمت:
//               </label>
//               <input
//                 id="max-price-input"
//                 type="text"
//                 placeholder="Max Price"
//                 value={priceInputValues[1]}
//                 onChange={(e) => handlePriceInputChange(1, e.target.value)}
//                 className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//             </div>
//           </div>
//         )}

//         <div className="w-full flex flex-col gap-2 px-3">
//           <div className="">
//             <ProductsSort sort={sort} setSort={setSort} />
//           </div>
//           <div className="w-full grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 border-t border-t-gray-200">
//             {isLoading ? skeleton : productCards}
//           </div>
//         </div>
//       </div>

//       {productCount > itemsPerPage && (
//         <div className="flex justify-center items-center mt-8 space-x-4">
//           <button
//             onClick={() => setPage(page - 1)}
//             disabled={page === 1}
//             className={`px-4 py-2 rounded-lg font-samim font-medium cursor-pointer ${page === 1 ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-teal-600 text-white hover:bg-teal-700"}`}
//           >
//             قبلی
//           </button>

//           <span className="text-gray-900 font-bold font-samim">
//             صفحه {page} از {totalPages}
//           </span>

//           <button
//             onClick={() => setPage(page + 1)}
//             disabled={page === totalPages}
//             className={`px-4 py-2 rounded-lg font-samim font-medium cursor-pointer ${page === totalPages ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-teal-600 text-white hover:bg-teal-700"}`}
//           >
//             بعدی
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// import React, { useCallback, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import FetchData from "../../Utils/FetchData";
// import ProductCard from "./ProductCard";
// import { handleResize } from "../../Utils/handleResize";
// import MobileProductCardSkeletom from "./ProductCard/MobileProductCard/MobileProductCardSkeletom";
// import DesktopProductCardSkeleton from "./ProductCard/DesktopProductCard/desktopProductCardSkeleton";
// import ProductsSort from "./ProductsSort";

// export default function Products() {
//    const [allProducts, setAllProducts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isMobileSize, setIsMobileSize] = useState(window.innerWidth < 640);
//   const [hideFilterBox, setHideFilterBox] = useState(window.innerWidth < 1024);
//   const [sort, setSort] = useState("-createdAt");
//   const [page, setPage] = useState(1);
//   const [productCount, setProductCount] = useState(0);
//   const { categoryId } = useParams();
//   const itemsPerPage = 20;

//   // filter states
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [currentFilterPrice, setCurrentFilterPrice] = useState([0, 999999999]);
//   const [priceInputValues, setPriceInputValues] = useState(["", ""]);
//   const [overallPriceRange, setOverallPriceRange] = useState([0, 999999999]);

//   const totalPages = Math.ceil(productCount / itemsPerPage);

//   useEffect(() => {
//     handleResize(setIsMobileSize, 640);
//     handleResize(setHideFilterBox, 1024);
//     window.scrollTo(0, 0);
//   }, []);

//   useEffect(() => {
//     setIsLoading(true);
//     const apiUrl = `products?${categoryId !== "all" ? `categoryId=${categoryId}&` : ""}page=${page}&limit=${itemsPerPage}&sort=${sort}&populate=defaultProductVariantId,variantIds`;

//     (async () => {
//       try {
//         const result = await FetchData(apiUrl);
//         setAllProducts(result.data);
//         setProductCount(result.count);

//         if (result.data && result.data.length > 0) {
//           let min = Infinity;
//           let max = -Infinity;

//           result.data.forEach((pr) => {
//             const finalPrice = pr?.defaultProductVariantId?.priceAfterDiscount ?? pr?.defaultProductVariantId?.price ?? 0;
//             if (finalPrice < min) min = finalPrice;
//             if (finalPrice > max) max = finalPrice;
//           });

//           if (min !== Infinity && max !== -Infinity) {
//             setOverallPriceRange([min, max]); // ذخیره محدوده کلی

//             // تبدیل اعداد به رشته برای نمایش در input
//             const minStr = String(min);
//             const maxStr = String(max);

//             setPriceInputValues([minStr, maxStr]); // نمایش حداقل و حداکثر در input ها
//             setCurrentFilterPrice([min, max]); // تنظیم فیلتر واقعی به این محدوده اولیه

//           } else {
//             setOverallPriceRange([0, 999999999]);
//             setPriceInputValues(["", ""]); // خالی کردن input ها اگر قیمت نامعتبر بود
//             setCurrentFilterPrice([0, 999999999]);
//           }
//         } else {
//           setOverallPriceRange([0, 999999999]);
//           setPriceInputValues(["", ""]);
//           setCurrentFilterPrice([0, 999999999]);
//         }
//       } catch (error) {
//         console.error("Error fetching products:", error);
//         setAllProducts([]);
//         setProductCount(0);
//         setOverallPriceRange([0, 999999999]);
//         setPriceInputValues(["", ""]);
//         setCurrentFilterPrice([0, 999999999]);
//       } finally {
//         setIsLoading(false);
//       }
//     })();
//   }, [page, sort, categoryId]); // price دیگر وابستگی نیست

//   // UseEffect برای فیلتر کردن محصولات بر اساس currentFilterPrice (فقط در فرانت اند)
//   // این useEffect حالا به currentFilterPrice (عددی) گوش می دهد
//   useEffect(() => {
//     const filtered = allProducts.filter((pr) => {
//       const finalPrice = pr?.defaultProductVariantId?.priceAfterDiscount ?? pr?.defaultProductVariantId?.price ?? 0;
//       // اطمینان از اینکه قیمت فیلتر شده معتبر است
//       return (
//         currentFilterPrice[0] !== null && currentFilterPrice[1] !== null &&
//         finalPrice >= currentFilterPrice[0] && finalPrice <= currentFilterPrice[1]
//       );
//     });
//     setFilteredProducts(filtered);
//   }, [allProducts, currentFilterPrice]); // هر وقت allProducts یا currentFilterPrice تغییر کرد، فیلتر را دوباره اجرا کن

//   // تابع برای مدیریت تغییر ورودی های قیمت توسط کاربر و اعمال فوری فیلتر
//   const handlePriceInputChange = useCallback((index, value) => {
//     const newPriceInputValues = [...priceInputValues];

//     // اگر کاربر شروع به پاک کردن کرده است (value خالی است)
//     if (value === "") {
//       newPriceInputValues[index] = ""; // input را خالی می گذاریم
//     } else {
//       newPriceInputValues[index] = value;
//     }
//     setPriceInputValues(newPriceInputValues); // آپدیت state ورودی ها

//     // ----- منطق اعمال فیلتر فوری -----
//     let min = 0;
//     let max = 999999999;

//     const minInputValue = newPriceInputValues[0]; // مقدار جدید min
//     const maxInputValue = newPriceInputValues[1]; // مقدار جدید max (اگر در حال ویرایش max بودیم)

//     // تبدیل مقادیر رشته ای به عدد
//     const parsedMin = minInputValue === "" ? null : Number(minInputValue);
//     const parsedMax = maxInputValue === "" ? null : Number(maxInputValue);

//     // تعیین مقدار نهایی min
//     if (parsedMin !== null && !isNaN(parsedMin)) {
//       min = parsedMin;
//     } else if (parsedMax !== null && !isNaN(parsedMax) && index === 1) {
//       // اگر max ویرایش شده و معتبر است، ولی min خالی است، min را 0 در نظر بگیرید.
//       min = 0;
//     }
//     // اگر هر دو خالی بودند، min همان 0 می ماند.

//     // تعیین مقدار نهایی max
//     if (parsedMax !== null && !isNaN(parsedMax)) {
//       max = parsedMax;
//     } else if (parsedMin !== null && !isNaN(parsedMin) && index === 0) {
//       // اگر min ویرایش شده و معتبر است، ولی max خالی است، max را برابر min قرار دهید.
//       max = parsedMin;
//     }

//     // اطمینان از اینکه min از max کوچکتر یا مساوی است
//     if (min > max) {
//       max = min; // اگر min بزرگتر بود، max را برابر min قرار می دهیم.
//     }

//     setCurrentFilterPrice([min, max]); // آپدیت state فیلتر واقعی
//     setPage(1); // ریست کردن صفحه به صفحه اول بعد از اعمال فیلتر

//   }, [priceInputValues]); // این useCallback به priceInputValues وابسته است

//   const productCards = filteredProducts.map((pr) => (
//     <ProductCard
//       key={pr._id}
//       variantIds={pr.variantIds}
//       image={pr.images[0]}
//       title={pr.title}
//       avgRating={pr.avgRating}
//       price={pr?.defaultProductVariantId?.price}
//       priceAfterDiscount={pr?.defaultProductVariantId?.priceAfterDiscount}
//       discountPercent={pr?.defaultProductVariantId?.discountPercent}
//       id={pr._id}
//     />
//   ));

//   const skeleton = Array.from({ length: itemsPerPage }, (_, index) =>
//     isMobileSize ? (
//       <MobileProductCardSkeletom key={index} />
//     ) : (
//       <DesktopProductCardSkeleton key={index} />
//     )
//   );

//   return (
//     <div className="mt-45 mb-25">
//       <div className="flex sm:px-3 lg:px-6 ">
//         {!hideFilterBox && (
//           <div className="w-90 h-100 bg-amber-100 p-4">
//             <h3 className="font-bold mb-2">فیلتر قیمت</h3>
//             <div className="flex flex-col gap-2">
//               <label htmlFor="min-price-input" className="text-sm">حداقل قیمت:</label>
//               <input
//                 id="min-price-input"
//                 type="text" // مهم: نوع input را text نگه دارید تا پاک شود
//                 placeholder="Min Price"
//                 value={priceInputValues[0]}
//                 onChange={(e) => handlePriceInputChange(0, e.target.value)}
//                 className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//               <label htmlFor="max-price-input" className="text-sm">حداکثر قیمت:</label>
//               <input
//                 id="max-price-input"
//                 type="text" // مهم: نوع input را text نگه دارید تا پاک شود
//                 placeholder="Max Price"
//                 value={priceInputValues[1]}
//                 onChange={(e) => handlePriceInputChange(1, e.target.value)}
//                 className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//             </div>
//              <p className="text-xs text-gray-600 mt-2">
//               محدوده کلی محصولات: {overallPriceRange[0].toLocaleString()} تا {overallPriceRange[1].toLocaleString()} تومان
//             </p>
//           </div>
//         )}

//         <div className="w-full flex flex-col gap-2 px-3">
//           <div className="">
//             <ProductsSort sort={sort} setSort={setSort} />
//           </div>
//           <div className="w-full grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 border-t border-t-gray-200">
//             {isLoading ? skeleton : productCards}
//           </div>
//         </div>
//       </div>

//       {productCount > itemsPerPage && (
//         <div className="flex justify-center items-center mt-8 space-x-4">
//           <button
//             onClick={() => setPage(page - 1)}
//             disabled={page === 1}
//             className={`px-4 py-2 rounded-lg font-samim font-medium cursor-pointer ${page === 1 ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-teal-600 text-white hover:bg-teal-700"}`}
//           >
//             قبلی
//           </button>

//           <span className="text-gray-900 font-bold font-samim">
//             صفحه {page} از {totalPages}
//           </span>

//           <button
//             onClick={() => setPage(page + 1)}
//             disabled={page === totalPages}
//             className={`px-4 py-2 rounded-lg font-samim font-medium cursor-pointer ${page === totalPages ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-teal-600 text-white hover:bg-teal-700"}`}
//           >
//             بعدی
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// import React, { useCallback, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import FetchData from "../../Utils/FetchData";
// import ProductCard from "./ProductCard";
// import { handleResize } from "../../Utils/handleResize";
// import MobileProductCardSkeletom from "./ProductCard/MobileProductCard/MobileProductCardSkeletom";
// import DesktopProductCardSkeleton from "./ProductCard/DesktopProductCard/desktopProductCardSkeleton";
// import SortIcon from "../../assets/svg/SortIcon";
// import ProductsSort from "./ProductsSort";

// export default function Products() {
//   const [products, setProducts] = useState([]);
//   const [productsCount, setProductsCount] = useState(0);
//   const [page, setPage] = useState(1);
//   const [price, setPrice] = useState([0, 500000000]);
//   const [sort, setSort] = useState("-createdAt");
//   const { categoryId } = useParams();
//   const [isLoading, setIsLoading] = useState(true);
//   const [isMobileSize, setIsMobileSize] = useState(window.innerWidth < 640);
//   const [hideFilterBox, setHideFilterBox] = useState(window.innerWidth < 1024);
//   const itemsPerPage = 20;

//   const totalPages = Math.ceil(productsCount / itemsPerPage);

//   useEffect(() => {
//     handleResize(setIsMobileSize, 640);
//   }, []);

//   useEffect(() => {
//     handleResize(setHideFilterBox, 1024);
//   }, []);

//   useEffect(()=>{
//     window.scrollTo(0, 0);
//   },[])
//   useEffect(() => {
//     (async () => {
//       const result = await FetchData(
//         `products?${categoryId !== "all" ? `categoryId=${categoryId}&` : ""}page=${page}&limit=${itemsPerPage}&sort=${sort}&minPrice[$gte]=${price[0]}&maxPrice[$lte]=${price[1]}&populate=defaultProductVariantId,variantIds`,
//       );
//       setProducts(result.data);
//       setProductsCount(result.count);
//       setIsLoading(false);
//     })();
//   }, [page, price, categoryId, sort]);

//   const productCards = products.map((pr) => {
//     return (
//       <ProductCard
//         key={pr._id}
//         variantIds={pr.variantIds}
//         image={pr.images[0]}
//         title={pr.title}
//         avgRating={pr.avgRating}
//         price={pr?.defaultProductVariantId?.price}
//         priceAfterDiscount={pr?.defaultProductVariantId?.priceAfterDiscount}
//         discountPercent={pr?.defaultProductVariantId?.discountPercent}
//         id={pr._id}
//       />
//     );
//   });

//   const skeleton = Array.from({ length: 20 }, (_, index) =>
//     isMobileSize ? (
//       <MobileProductCardSkeletom key={index} />
//     ) : (
//       <DesktopProductCardSkeleton key={index} />
//     ),
//   );
//   return (
//     <div className="mt-45 mb-25">

//       <div className="flex sm:px-3 lg:px-6 ">
//         {!hideFilterBox && <div className="w-90 h-100 bg-amber-100">dfdfdf</div>}

//         <div className="w-full flex flex-col gap-2 px-3">
//           {/* Sort section */}
//           <div className="">
//           <ProductsSort sort={sort} setSort={setSort}/>
//           </div>
//         <div className="w-full grid  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  border-t border-t-gray-200">
//           {isLoading ? skeleton : productCards}
//         </div>
//         </div>
//       </div>
//       {/* Pagination */}
//       {productsCount > itemsPerPage && (
//         <div className="flex justify-center items-center mt-8 space-x-4">
//           <button
//             onClick={() => setPage(page - 1)}
//             disabled={page === 1}
//             className={`px-4 py-2 rounded-lg font-samim font-medium cursor-pointer ${page === 1 ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-teal-600 text-white hover:bg-teal-700"}`}
//           >
//             قبلی
//           </button>

//           <span className="text-gray-900 font-bold font-samim">
//             صفحه {page} از {totalPages}
//           </span>

//           <button
//             onClick={() => setPage(page + 1)}
//             disabled={page === totalPages}
//             className={`px-4 py-2 rounded-lg font-samim font-medium cursor-pointer ${page === totalPages ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-teal-600 text-white hover:bg-teal-700"}`}
//           >
//             بعدی
//           </button>
//         </div>
//       )}

//     </div>
//   );
// }
