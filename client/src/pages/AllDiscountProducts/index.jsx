import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';
import { handleResize } from '../../Utils/handleResize';
import FetchData from '../../Utils/FetchData';
import MobileDiscountCardSkeleton from './ProductCard/MobileProductCard/MobileDiscountCardSkeleton';
import DesktopDiscountCardSkeleton from './ProductCard/DesktopProductCard/DesktopDiscountCardSkeleton';

export default function AllDiscountProducts() {
    const [discountProducts, setDiscountProducts] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth<640);
  const [isLoading, setIsLoading] = useState(true);
  const [productsCount,setProductsCount]=useState(0)
  const itemsPerPage = 20;
  const [page,setPage]=useState(1)
const totalPages = Math.ceil(productsCount / itemsPerPage);

  useEffect(() => {
    (async () => {
      const result = await FetchData(
        `product-variants?sort=-discountPercent&limit=${itemsPerPage}&page=${page}&discountPercent[$gt]=0&populate=productId,variantId`,
      );
      setDiscountProducts(result.data || []);
      setIsLoading(false);
      setProductsCount(result.count||0)
    })();
  }, [page]);

  useEffect(() => {
    handleResize(setIsMobile, 640);
  }, []);

  
  const validDiscountItems=discountProducts.filter((pr)=>pr.discountPercent>0)

  const discountItems=validDiscountItems.map((pr)=>{
     if (!pr.productId) return null;
    return   <ProductCard key={pr._id}
          image={pr.productId?.images[0]}
          title={pr.productId?.title}
          price={pr.price}
          priceAfterDiscount={pr.priceAfterDiscount}
          discountPercent={pr.discountPercent}
          id={pr.productId._id}
          
        />
  })


  const skeleton=Array.from({length:20},(_,index)=>{
    return isMobile?<MobileDiscountCardSkeleton key={index}/>:<DesktopDiscountCardSkeleton key={index}/>
  })

  return (
    <div className='mt-40 mb-10'>
    <div className='w-full grid  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:px-3 lg:px-6'>
      {isLoading?skeleton:discountItems}
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
  )
}









// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import ProductCard from './ProductCard';
// import { handleResize } from '../../Utils/handleResize';
// import FetchData from '../../Utils/FetchData';

// export default function AllDiscountProducts() {
//     const [discountProducts, setDiscountProducts] = useState([]);
//     const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
//     const [isLoading, setIsLoading] = useState(true);
    
//     // این متغیر باید تعداد "کل" محصولات رو نگه داره، نه تعداد محصولات لود شده
//     const [totalProductsCount, setTotalProductsCount] = useState(0);
    
//     const itemsPerPage = 5;
//     const [page, setPage] = useState(1);
    
//     // محاسبه تعداد صفحات بر اساس تعداد کل محصولات
//     const totalPages = Math.ceil(totalProductsCount / itemsPerPage);

//     useEffect(() => {
//         (async () => {
//             try {
//                 const result = await FetchData(
//                     `product-variants?sort=-discountPercent&limit=${itemsPerPage}&page=${page}&populate=productId,variantId`,
//                 );
                
//                 // 1. لیست محصولات فعلی
//                 setDiscountProducts(result.data || []);
                
//                 // 2. تعداد کل محصولات (مهم!)
//                 // در Strapi معمولاً result.count یا result.pagination.count وجود دارد
//                 // اگر result.count وجود نداشت، ممکن است result.meta.pagination.total باشد
//                 const count = result.data.length || 0;
//                 setTotalProductsCount(count);
                
//                 setIsLoading(false);
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//                 setIsLoading(false);
//             }
//         })();
//     }, [page]);

//     useEffect(() => {
//         handleResize(setIsMobile, 640);
//     }, []);

//     // اگر در حال لودینگ هستیم، می‌تونی یک اسکلتون نشون بدی
//     if (isLoading) {
//         return <div>در حال بارگذاری...</div>;
//     }

//     const discountItems = discountProducts.map((pr) => {
//         // چک کردن وجود productId برای جلوگیری از ارور
//         if (!pr.productId) return null;
        
//         return (
//             <ProductCard 
//                 key={pr._id}
//                 image={pr.productId.images[0]}
//                 title={pr.productId.title}
//                 price={pr.price}
//                 priceAfterDiscount={pr.priceAfterDiscount}
//                 discountPercent={pr.discountPercent}
//                 id={pr.productId._id}
//             />
//         );
//     });

//     return (
//         <div>
//             <div className='w-full grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
//                 {discountItems}
//             </div>
            
//             {/* Pagination */}
//             {/* شرط: اگر تعداد کل محصولات بیشتر از تعداد نمایش داده شده در هر صفحه باشه */}
//             {totalProductsCount > itemsPerPage && (
//                 <div className="flex justify-center items-center mt-8 space-x-4">
//                     <button
//                         onClick={() => setPage(page - 1)}
//                         disabled={page === 1}
//                         className={`px-4 py-2 rounded-lg font-samim font-medium cursor-pointer ${
//                             page === 1 
//                                 ? "bg-gray-300 text-gray-600 cursor-not-allowed" 
//                                 : "bg-teal-600 text-white hover:bg-teal-700"
//                         }`}
//                     >
//                         قبلی
//                     </button>

//                     <span className="text-gray-900 font-bold font-samim">
//                         صفحه {page} از {totalPages}
//                     </span>

//                     <button
//                         onClick={() => setPage(page + 1)}
//                         disabled={page === totalPages}
//                         className={`px-4 py-2 rounded-lg font-samim font-medium cursor-pointer ${
//                             page === totalPages 
//                                 ? "bg-gray-300 text-gray-600 cursor-not-allowed" 
//                                 : "bg-teal-600 text-white hover:bg-teal-700"
//                         }`}
//                     >
//                         بعدی
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// }



// import React, { useEffect, useState } from 'react';
// import ProductCard from './ProductCard';
// import { handleResize } from '../../Utils/handleResize';
// import FetchData from '../../Utils/FetchData';

// export default function AllDiscountProducts() {
//     const [discountProducts, setDiscountProducts] = useState([]);
//     const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
//     const [isLoading, setIsLoading] = useState(true);
    
//     // تعداد کل محصولات تخفیف‌دار (نه تعداد لود شده)
//     const [totalDiscountedCount, setTotalDiscountedCount] = useState(0);
    
//     const itemsPerPage = 5;
//     const [page, setPage] = useState(1);
    
//     // محاسبه تعداد صفحات بر اساس تعداد کل محصولات تخفیف‌دار
//     const totalPages = Math.ceil(totalDiscountedCount / itemsPerPage);

//     useEffect(() => {
//         (async () => {
//             try {
//                 // 1. اضافه کردن فیلتر: فقط محصولاتی که discountPercent بزرگتر از صفر هستند
//                 // نکته: در Strapi معمولا باید از فیلتر استفاده کرد. 
//                 // اگر API شما از فیلتر پشتیبانی نمی‌کند، باید در سمت کلاینت فیلتر کنید (که برای Pagination خوب نیست)
//                 // فرض بر این است که API شما از فیلتر پشتیبانی می‌کند:
//                 // const filter = `discountPercent[$gt]=0`;
                
//                 const result = await FetchData(
//                     `product-variants?sort=-discountPercent&limit=${itemsPerPage}&page=${page}&populate=productId,variantId&discountPercent[$gt]=0`,
//                 );
                
//                 // 2. دریافت لیست محصولات
//                 const data = result.data || [];
//                 setDiscountProducts(data);
                
//                 // 3. دریافت تعداد کل محصولات تخفیف‌دار
//                 // در Strapi v4 این مقدار معمولا در result.meta.pagination.total یا result.count است
//                 // اگر result.count وجود نداشت، ممکن است result.meta.pagination.total باشد
//                 const count = result.count ||0;
//                 setTotalDiscountedCount(count);
                
//                 setIsLoading(false);
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//                 setIsLoading(false);
//             }
//         })();
//     }, [page]);

//     useEffect(() => {
//         handleResize(setIsMobile, 640);
//     }, []);

//     if (isLoading) {
//         return <div className="text-center p-10">در حال بارگذاری...</div>;
//     }

//     // فیلتر کردن محصولات در سمت کلاینت (لایه امنیتی دوم)
//     // اگر API فیلتر را اعمال نکرده باشد، این خط تضمین می‌کند که فقط محصولات تخفیف‌دار نمایش داده شوند
//     const validDiscountItems = discountProducts.filter(pr => pr.discountPercent > 0);

//     const discountItems = validDiscountItems.map((pr) => {
        // if (!pr.productId) return null;
        
//         return (
//             <ProductCard 
//                 key={pr._id}
//                 image={pr.productId.images[0]}
//                 title={pr.productId.title}
//                 price={pr.price}
//                 priceAfterDiscount={pr.priceAfterDiscount}
//                 discountPercent={pr.discountPercent}
//                 id={pr.productId._id}
//             />
//         );
//     });

//     return (
//         <div className='mt-45 mb-10'>
//             {validDiscountItems.length === 0 ? (
//                 <p className="text-center text-gray-500 mt-10">محصولی با تخفیف یافت نشد.</p>
//             ) : (
//                 <>
//                     <div className='w-full grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 '>
//                         {discountItems}
//                     </div>
                    
//                     {/* Pagination */}
//                     {totalDiscountedCount > itemsPerPage && (
//                         <div className="flex justify-center items-center mt-8 space-x-4">
//                             <button
//                                 onClick={() => setPage(page - 1)}
//                                 disabled={page === 1}
//                                 className={`px-4 py-2 rounded-lg font-samim font-medium cursor-pointer ${
//                                     page === 1 
//                                         ? "bg-gray-300 text-gray-600 cursor-not-allowed" 
//                                         : "bg-teal-600 text-white hover:bg-teal-700"
//                                 }`}
//                             >
//                                 قبلی
//                             </button>

//                             <span className="text-gray-900 font-bold font-samim">
//                                 صفحه {page} از {totalPages}
//                             </span>

//                             <button
//                                 onClick={() => setPage(page + 1)}
//                                 disabled={page === totalPages}
//                                 className={`px-4 py-2 rounded-lg font-samim font-medium cursor-pointer ${
//                                     page === totalPages 
//                                         ? "bg-gray-300 text-gray-600 cursor-not-allowed" 
//                                         : "bg-teal-600 text-white hover:bg-teal-700"
//                                 }`}
//                             >
//                                 بعدی
//                             </button>
//                         </div>
//                     )}
//                 </>
//             )}
//         </div>
//     );
// }





// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom';
// import ProductCard from './ProductCard';
// import { handleResize } from '../../Utils/handleResize';
// import FetchData from '../../Utils/FetchData';

// export default function AllDiscountProducts() {
//     const [discountProducts, setDiscountProducts] = useState([]);
//   const [isMobile, setIsMobile] = useState(window.innerWidth<640);
//   const [isLoading, setIsLoading] = useState(true);
//   const [productsCount,setProductsCount]=useState(0)
//   const itemsPerPage = 20;
//   const [page,setPage]=useState(1)
// const totalPages = Math.ceil(productsCount / itemsPerPage);

//   useEffect(() => {
//     (async () => {
//       const result = await FetchData(
//         `product-variants?sort=-discountPercent&limit=12&page=1&populate=productId,variantId`,
//       );
//       setDiscountProducts(result.data || []);
//       setIsLoading(false);
//     })();
//   }, []);

//   useEffect(() => {
//     handleResize(setIsMobile, 640);
//   }, []);

//   const discountItems=discountProducts.map((pr)=>{
//     return   <ProductCard key={pr._id}
//           image={pr.productId?.images[0]}
//           title={pr.productId?.title}
//           price={pr.price}
//           priceAfterDiscount={pr.priceAfterDiscount}
//           discountPercent={pr.discountPercent}
//           id={pr?.productId._id}
          
//         />
//   })
//   return (
//     <div>
//     <div className='w-full grid  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
//       {discountItems}
//     </div>
//     {/* Pagination */}
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
//   )
// }
