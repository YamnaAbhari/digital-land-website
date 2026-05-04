
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FetchData from "../../Utils/FetchData";
import ProductCard from "./ProductCard";
import { handleResize } from "../../Utils/handleResize";
import MobileProductCardSkeletom from "./ProductCard/MobileProductCard/MobileProductCardSkeletom";
import DesktopProductCardSkeleton from "./ProductCard/DesktopProductCard/desktopProductCardSkeleton";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [productsCount, setProductsCount] = useState(0);
  const [page, setPage] = useState(1);
  const [price, setPrice] = useState([0, 500000000]);
  const [sort, setSort] = useState("-createdAt");
  const { categoryId } = useParams();
  const [isLoading,setIsLoading]=useState(true)
    const [isMobileSize, setIsMobileSize] = useState(window.innerWidth<640)
    const [hi,setHi]=useState(window.innerWidth<1024)
  const itemsPerPage = 20;

  const totalPages = Math.ceil(productsCount / itemsPerPage);

  useEffect(() => {
    handleResize(setIsMobileSize, 640);

  }, []);

   useEffect(() => {
    handleResize(setHi, 1024);

  }, []);


  useEffect(() => {
    (async () => {
      const result = await FetchData(
        `products?${categoryId !== "all" ? `categoryId=${categoryId}&` : ""}page=${page}&limit=${itemsPerPage}&sort=${sort}&minPrice[$gte]=${price[0]}&maxPrice[$lte]=${price[1]}&populate=defaultProductVariantId,variantIds`,
      );
      setProducts(result.data);
      setProductsCount(result.count);
      setIsLoading(false)
    })();
  }, [page, price, categoryId, sort]);

  const productCards = products.map((pr) => {
    return (
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
    );
  });

 
  const skeleton = Array.from({ length: 20 }, (_, index) => (
  isMobileSize 
    ? <MobileProductCardSkeletom key={index} /> 
    : <DesktopProductCardSkeleton key={index} />
));
  return (
    <div className="mt-45 mb-25">
      <div className="flex sm:px-3 lg:px-6 ">
        {!hi &&  (
          <div className="w-90 h-100 bg-amber-100">dfdfdf</div>
        )}
        <div className="w-full grid  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
          {isLoading?skeleton:productCards}
          
        </div>
      </div>
      {/* Pagination */}
      {productsCount > itemsPerPage && (
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













// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import FetchData from "../../Utils/FetchData";
// import ProductCard from "./ProductCard";
// import MobileProductCardSkeletom from "./ProductCard/MobileProductCard/MobileProductCardSkeletom";
// import DesktopProductCardSkeleton from "./ProductCard/DesktopProductCard/desktopProductCardSkeleton";

// export default function Products() {
//   const [products, setProducts] = useState([]);
//   const [productsCount, setProductsCount] = useState(0);
//   const [page, setPage] = useState(1);
//   const [price, setPrice] = useState([0, 500000000]);
//   const [sort, setSort] = useState("-createdAt");
//   const { categoryId } = useParams();
  
//   const [isLoading, setIsLoading] = useState(true);
  
//   // نکته کلیدی: مقدار اولیه استیت رو مستقیماً از window.innerWidth می‌گیریم
//   // اگر عرض صفحه کمتر از 1024 باشد، فیلتر مخفی است (true)
//   // اگر بزرگتر باشد، فیلتر نمایش داده می‌شود (false)
//   const [hideFilterBox, setHideFilterBox] = useState(window.innerWidth < 1024);
  
//   // برای انتخاب اسکلتون مناسب (موبایل یا دسکتاپ)
  // const [isMobileSize, setIsMobileSize] = useState(window.innerWidth < 640);

//   const itemsPerPage = 20;
//   const totalPages = Math.ceil(productsCount / itemsPerPage);

//   useEffect(() => {
//     // تابعی که هر بار سایز تغییر کرد اجرا میشه
//     const handleResize = () => {
//       setHideFilterBox(window.innerWidth < 1024);
//       setIsMobileSize(window.innerWidth < 640);
//     };

//     // اضافه کردن لسنر برای تغییر سایز
//     window.addEventListener("resize", handleResize);

//     // پاکسازی لسنر موقع خروج
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   useEffect(() => {
//    (async()=>{
//         const result = await FetchData(
//           `products?${categoryId !== "all" ? `categoryId=${categoryId}&` : ""}page=${page}&limit=${itemsPerPage}&sort=${sort}&minPrice[$gte]=${price[0]}&maxPrice[$lte]=${price[1]}&populate=defaultProductVariantId,variantIds`,
//         );
//         setProducts(result.data);
//         setProductsCount(result.count);
//      setIsLoading(false);
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

//   const skeleton = Array.from({ length: 20 }, (_, index) => (
//     isMobileSize ? (
//       <MobileProductCardSkeletom key={index} />
//     ) : (
//       <DesktopProductCardSkeleton key={index} />
//     )
//   ));

//   return (
//     <div className="mt-45 mb-25">
//       <div className="flex sm:px-3 lg:px-6">
        
//         {/* حالا این شرط همیشه درست کار می‌کنه چون مقدار اولیه استیت درست ست شده */}
//         {!hideFilterBox && (
//           <div className="w-90 h-100 bg-amber-100 flex-shrink-0">
//             {/* محتوای فیلتر */}
//             dfdfdf
//           </div>
//         )}
        
//         <div className={`w-full ${isMobileSize?"flex flex-col":"grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"}`}>
//           {isLoading ? skeleton : productCards}
//         </div>
//       </div>
//     </div>
//   );
// }