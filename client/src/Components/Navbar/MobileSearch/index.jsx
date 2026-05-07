import React, { useEffect, useState } from "react";
import { BiArrowBack, BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import FetchData from "../../../Utils/FetchData";
import { useDispatch } from "react-redux";

export default function MobileSearch({ onClose, isSearchPageVisible }) {
  const navigate = useNavigate();
  const [searchInp, setSearchInp] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (searchInp.length < 3) return;
      setLoading(true);
      const result = await FetchData(`search?q=${searchInp}`);
      setLoading(false);
      if (!result.success) {
        setSearchResult("notFound");
      } else {
        setSearchResult(result.data);
      }
    })();
  }, [searchInp]);

  const categoryItems = searchResult?.categories?.map((item) => {
    return (
      <div
        onClick={() => {
          navigate(`/products/${item._id}/${item.title.replaceAll(" ", "-")}`);
          onClose();
        }}
        key={item._id}
        className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 active:scale-95 transition cursor-pointer"
      >
        <img
          src={import.meta.env.VITE_BASE_FILE + item.image}
          alt={item.title}
          className="w-10 h-10 rounded-md object-cover"
        ></img>
        <span className="text-sm font-samim font-medium text-gray-800">
          {item.title}
        </span>
      </div>
    );
  });

  const productsItems = searchResult?.products?.map((item) => {
    return (
      <div
        onClick={() => {
          navigate(
            `/product-details/${item._id}/${item.title.replaceAll(" ", "-")}`,
          );
          onClose();
        }}
        key={item._id}
        className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 active:scale-95 transition cursor-pointer"
      >
        <img
          src={import.meta.env.VITE_BASE_FILE + item.images[0]}
          alt={item.title}
          className="w-10 h-10 rounded-md object-cover"
        ></img>
        <span className="text-sm font-samim font-medium text-gray-800">
          {item.title}
        </span>
      </div>
    );
  });

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50 " onClick={onClose}></div>

      {/* search box */}

      <div
        className={`absolute bottom-0 w-full h-screen bg-white rounded-t-3xl p-3 ${isSearchPageVisible ? "animate-slideUp" : "animate-slideDown"} `}
      >
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="relative w-full">
            <input
              type="text"
              autoFocus
              value={searchInp}
              onChange={(e) => setSearchInp(e.target.value)}
              placeholder="جستجو در دیجیتال لند"
              className="w-full bg-[#f0f0f1] h-11 rounded-full pr-10 pl-4 placeholder:text-[15px] outline-0 focus:ring-1 focus:ring-gray-300 transition-all font-samim"
            />
            <div className="absolute top-1/2 -translate-y-1/2 px-4">
              <BiSearch className="text-xl text-gray-500" />
            </div>
          </div>

          {/* close search page*/}
          <div
            onClick={onClose}
            className="flex justify-end my-4 cursor-pointer"
          >
            <BiArrowBack className="text-[22px] " />
          </div>
        </div>

        <div className="overflow-y-auto h-[90%] space-y-2">
        

          {loading && (
            <div className="text-center text-gray-400 py-6 font-samim font-medium">
              در حال جستجو...
            </div>
          )}

          {searchResult === "notFound" && (
            <div className="text-center text-gray-400 py-6 font-samim font-medium">
              نتیجه‌ای یافت نشد
            </div>
          )}

          {searchResult?.categories?.length > 0 && (
            <div className="flex flex-col w-full gap-3 mt-4">
              <h3 className="text-sm text-gray-700 font-samim font-medium">
                دسته بندی
              </h3>
              <div className="flex flex-col gap-2">{categoryItems}</div>
            </div>
          )}

          {searchResult?.products?.length > 0 && (
            <div className="flex flex-col w-full gap-3 mt-4">
              <h3 className="text-sm text-gray-700 font-samim font-medium">
                محصولات
              </h3>
              <div className="flex flex-col gap-2">{productsItems}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import { BiArrowBack, BiSearch } from "react-icons/bi";
// import { useNavigate } from "react-router-dom";
// import FetchData from "../../../Utils/FetchData";
// import { useDispatch, useSelector } from "react-redux";
// import { setSearchTerm } from "../../../Store/SearchSlice";

// export default function MobileSearch({ onClose, isSearchPageVisible }) {
//   const navigate = useNavigate();
//   const [searchInp, setSearchInp] = useState("");
//   const [searchResult, setSearchResult] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const dispatch=useDispatch()
//   const {searchTerm}=useSelector(state=>state.search)

//   useEffect(() => {
//     (async () => {
//       if (searchTerm.length < 3) return;
//       setLoading(true);
//       const result = await FetchData(`search?q=${searchTerm}`);
//       setLoading(false);
//       if (!result.success) {
//         setSearchResult("notFound");
//       } else {
//         setSearchResult(result.data);
//       }

//     })();
//   }, [searchTerm]);

//   const categoryItems=searchResult?.categories?.map((item)=>{
//    return <div onClick={()=>{navigate(`/products/${item._id}/${item.title.replaceAll(' ','-')}`); onClose()}} key={item._id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 active:scale-95 transition cursor-pointer">
//        <img src={import.meta.env.VITE_BASE_FILE+ item.image} alt={item.title} className="w-10 h-10 rounded-md object-cover"></img>
//        <span className="text-sm font-samim font-medium text-gray-800">{item.title}</span>
//     </div>
//   })

//    const productsItems=searchResult?.products?.map((item)=>{
//    return <div onClick={()=>{navigate(`/product-details/${item._id}/${item.title.replaceAll(' ','-')}`); onClose()}} key={item._id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 active:scale-95 transition cursor-pointer">
//        <img src={import.meta.env.VITE_BASE_FILE+ item.images[0]} alt={item.title} className="w-10 h-10 rounded-md object-cover"></img>
//        <span className="text-sm font-samim font-medium text-gray-800">{item.title}</span>
//     </div>
//   })

//   return (
//     <div className="fixed inset-0 z-50">
//       <div className="absolute inset-0 bg-black/50 " onClick={onClose}></div>

//       {/* search box */}

//       <div
//         className={`absolute bottom-0 w-full h-screen bg-white rounded-t-3xl p-3 ${isSearchPageVisible ? "animate-slideUp" : "animate-slideDown"} `}
//       >
//         <div className="flex items-center justify-between gap-2 mb-4">
//           <div className="relative w-full">
//             <input
//               type="text"
//               autoFocus
//               value={searchTerm}
//               onChange={(e)=>dispatch(setSearchTerm(e.target.value))}
//               placeholder="جستجو در دیجیتال لند"
//               className="w-full bg-[#f0f0f1] h-11 rounded-full pr-10 pl-4 placeholder:text-[15px] outline-0 focus:ring-1 focus:ring-gray-300 transition-all font-samim"
//             />
//             <div className="absolute top-1/2 -translate-y-1/2 px-4">
//               <BiSearch className="text-xl text-gray-500" />
//             </div>
//           </div>

//           {/* close search page*/}
//           <div
//             onClick={onClose}
//             className="flex justify-end my-4 cursor-pointer"
//           >
//             <BiArrowBack className="text-[22px] " />
//           </div>
//         </div>

//       <div className="overflow-y-auto h-[90%] space-y-2">
//            {loading && (
//             <div className="text-center text-gray-400 py-6 font-samim font-medium">
//               در حال جستجو...
//             </div>
//           )}

//           {searchResult === "notFound" && (
//             <div className="text-center text-gray-400 py-6 font-samim font-medium">
//               نتیجه‌ای یافت نشد
//             </div>
//           )}

//           {searchResult?.categories?.length>0 &&
//           <div className="flex flex-col w-full gap-3 mt-4">
//             <h3 className="text-sm text-gray-800 font-samim font-medium">دسته بندی</h3>
//             <div className="flex flex-col gap-2">
//               {categoryItems}
//             </div>
//           </div>
//           }

//             {searchResult?.products?.length>0 &&
//           <div className="flex flex-col w-full gap-3 mt-4">
//             <h3 className="text-sm text-gray-800 font-samim font-medium">دسته بندی</h3>
//             <div className="flex flex-col gap-2">
//               {productsItems}
//             </div>
//           </div>
//           }
//       </div>
//         <div className="text-center text-gray-500 py-8">نتایج جستجو...</div>
//       </div>
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { BiArrowBack, BiSearch } from "react-icons/bi";
// import { useNavigate } from "react-router-dom";
// import FetchData from "../../../Utils/FetchData";
// import { useDispatch, useSelector } from "react-redux";
// import { setSearchTerm, clearSearchTerm, setLastSelectedProduct } from "../../../Store/SearchSlice";

// export default function MobileSearch({ onClose, isSearchPageVisible }) {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { searchTerm } = useSelector((state) => state.search);

//   const [searchResult, setSearchResult] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     (async () => {
//       if (!searchTerm || searchTerm.length < 3) {
//         setSearchResult([]);
//         return;
//       }
//       setLoading(true);
//       try {
//         const result = await FetchData(`search?q=${searchTerm}`);
//         setLoading(false);
//         if (result.success && result.data) {
//           setSearchResult(result.data);
//         } else {
//           setSearchResult({ categories: [], products: [] });
//         }
//       } catch (error) {
//         setLoading(false);
//         setSearchResult({ categories: [], products: [] });
//       }
//     })();
//   }, [searchTerm]);

//   const handleItemClick = (path, title) => {
//     // اسم محصول رو توی lastSelectedProduct ست کن
//     dispatch(setLastSelectedProduct(title));
//     navigate(path);
//     dispatch(clearSearchTerm()); // سرچ رو هم پاک کن
//     onClose();
//   };

//   const categoryItems = searchResult?.categories?.map((item) => {
//     return (
//       <div
//         onClick={() =>
//           handleItemClick(`/products/${item._id}/${item.title.replaceAll(" ", "-")}`, item.title)
//         }
//         key={item._id}
//         className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 active:scale-95 transition cursor-pointer"
//       >
//         <img
//           src={import.meta.env.VITE_BASE_FILE + item.image}
//           alt={item.title}
//           className="w-10 h-10 rounded-md object-cover"
//         />
//         <span className="text-sm font-samim font-medium text-gray-800">
//           {item.title}
//         </span>
//       </div>
//     );
//   });

//   const productsItems = searchResult?.products?.map((item) => {
//     return (
//       <div
//         onClick={() =>
//           handleItemClick(`/product-details/${item._id}/${item.title.replaceAll(" ", "-")}`, item.title)
//         }
//         key={item._id}
//         className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 active:scale-95 transition cursor-pointer"
//       >
//         <img
//           src={import.meta.env.VITE_BASE_FILE + item.images[0]}
//           alt={item.title}
//           className="w-10 h-10 rounded-md object-cover"
//         />
//         <span className="text-sm font-samim font-medium text-gray-800">
//           {item.title}
//         </span>
//       </div>
//     );
//   });

//   return (
//     <div className="fixed inset-0 z-50">
//       <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>

//       <div
//         className={`absolute bottom-0 w-full h-screen bg-white rounded-t-3xl p-3 ${
//           isSearchPageVisible ? "animate-slideUp" : "animate-slideDown"
//         }`}
//       >
//         <div className="flex items-center justify-between gap-2 mb-4">
//           <div className="relative w-full">
//             <input
//               type="text"
//               autoFocus
//               value={searchTerm}
//               onChange={(e) => dispatch(setSearchTerm(e.target.value))}
//               placeholder="جستجو در دیجیتال لند"
//               className="w-full bg-[#f0f0f1] h-11 rounded-full pr-10 pl-4 placeholder:text-[15px] outline-0 focus:ring-1 focus:ring-gray-300 transition-all font-samim"
//             />
//             <div className="absolute top-1/2 -translate-y-1/2 px-4">
//               <BiSearch className="text-xl text-gray-500" />
//             </div>
//           </div>
//         </div>

//         <div className="overflow-y-auto h-[calc(100%-100px)]">
//           {loading && <div className="text-center py-4 text-gray-500">در حال جستجو...</div>}
//           {!loading && (
//             <>
//               {categoryItems}
//               {productsItems}
//               {!loading && !searchResult?.categories?.length && !searchResult?.products?.length && (
//                 <div className="text-center py-8 text-gray-500">نتیجه‌ای یافت نشد</div>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { BiSearch } from "react-icons/bi";
// import { useNavigate } from "react-router-dom";
// import FetchData from "../../../Utils/FetchData";
// import { useDispatch, useSelector } from "react-redux";
// import { setSearchTerm, clearSearchTerm, setSelectedProductTitle } from "../../../Store/SearchSlice";

// export default function MobileSearch({ onClose, isSearchPageVisible }) {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { searchTerm, selectedProductTitle} = useSelector((state) => state.search);

//   const [searchResult, setSearchResult] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     (async () => {
//       if (!searchTerm || searchTerm.length < 3) {
//         setSearchResult([]);
//         return;
//       }
//       setLoading(true);
//       try {
//         const result = await FetchData(`search?q=${searchTerm}`);
//         setLoading(false);
//         if (result.success && result.data) {
//           setSearchResult(result.data);
//         } else {
//           setSearchResult({ categories: [], products: [] });
//         }
//       } catch (error) {
//         setLoading(false);
//         setSearchResult({ categories: [], products: [] });
//       }
//     })();
//   }, [searchTerm]);

//   // تابعی که وقتی روی محصول کلیک میشه صدا زده میشه
//   // const handleItemClick = (path, title) => {
//   //   // 1. اسم محصول رو توی Redux ذخیره کن
//   //   dispatch(setSelectedProductTitle(title));
//   //   // 2. به صفحه محصول برو
//   //   navigate(path);
//   //   // 3. سرچ رو پاک کن
//   //   dispatch(clearSearchTerm());
//   //   // 4. پنجره سرچ رو ببند
//   //   onClose();
//   // };

//   const handleItemClick = (path, title) => {
//   console.log("🔴 کلیک روی محصول:", title); // آیا این پیام میاد؟

//   try {
//     console.log("🚀 در حال dispatch...");
//     dispatch(setSelectedProductTitle(title));
//     console.log("✅ dispatch انجام شد");

//     navigate(path);
//     dispatch(clearSearchTerm());
//     onClose();
//   } catch (error) {
//     console.error("❌ خطا در dispatch:", error);
//   }
// };

//   const categoryItems = searchResult?.categories?.map((item) => {
//     return (
//       <div
//         onClick={() =>
//           handleItemClick(`/products/${item._id}/${item.title.replaceAll(" ", "-")}`, item.title)
//         }
//         key={item._id}
//         className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 active:scale-95 transition cursor-pointer"
//       >
//         <img
//           src={import.meta.env.VITE_BASE_FILE + item.image}
//           alt={item.title}
//           className="w-10 h-10 rounded-md object-cover"
//         />
//         <span className="text-sm font-samim font-medium text-gray-800">
//           {item.title}
//         </span>
//       </div>
//     );
//   });

//   const productsItems = searchResult?.products?.map((item) => {
//     return (
//       <div
//         onClick={() =>
//           handleItemClick(`/product-details/${item._id}/${item.title.replaceAll(" ", "-")}`, item.title)
//         }
//         key={item._id}
//         className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 active:scale-95 transition cursor-pointer"
//       >
//         <img
//           src={import.meta.env.VITE_BASE_FILE + item.images[0]}
//           alt={item.title}
//           className="w-10 h-10 rounded-md object-cover"
//         />
//         <span className="text-sm font-samim font-medium text-gray-800">
//           {item.title}
//         </span>
//       </div>
//     );
//   });

//   return (
//     <div className="fixed inset-0 z-50">
//       <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>

//       <div
//         className={`absolute bottom-0 w-full h-screen bg-white rounded-t-3xl p-3 ${
//           isSearchPageVisible ? "animate-slideUp" : "animate-slideDown"
//         }`}
//       >
//         <div className="flex items-center justify-between gap-2 mb-4">
//           <div className="relative w-full">
//             <input
//               type="text"
//               autoFocus
//               value={searchTerm}
//               onChange={(e) => dispatch(setSearchTerm(e.target.value))}
//               placeholder="جستجو در دیجیتال لند"
//               className="w-full bg-[#f0f0f1] h-11 rounded-full pr-10 pl-4 placeholder:text-[15px] outline-0 focus:ring-1 focus:ring-gray-300 transition-all font-samim"
//             />
//             <div className="absolute top-1/2 -translate-y-1/2 px-4">
//               <BiSearch className="text-xl text-gray-500" />
//             </div>
//           </div>
//         </div>

//         <div className="overflow-y-auto h-[calc(100%-100px)]">
//           {loading && <div className="text-center py-4 text-gray-500">در حال جستجو...</div>}
//           {!loading && (
//             <>
//               {categoryItems}
//               {productsItems}
//               {!loading && !searchResult?.categories?.length && !searchResult?.products?.length && (
//                 <div className="text-center py-8 text-gray-500">نتیجه‌ای یافت نشد</div>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// // src/Components/MobileSearch.jsx (تغییر یافته)
// import React, { useEffect, useState } from "react";
// import { BiArrowBack, BiSearch } from "react-icons/bi";
// import { useNavigate } from "react-router-dom";
// import FetchData from "../../../Utils/FetchData";
// import { useDispatch, useSelector } from "react-redux"; // Import Redux hooks
// import { setSearchTerm, clearSearchTerm } from "../../../Store/SearchSlice"; // Import actions

// export default function MobileSearch({ onClose, isSearchPageVisible }) {
//   const navigate = useNavigate();
//   const dispatch = useDispatch(); // Get dispatch function
//   const currentSearchTerm = useSelector((state) => state.search.searchTerm); // Get searchTerm from Redux

//   const [searchResult, setSearchResult] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {

//     if (currentSearchTerm.length < 3) {
//       setSearchResult([]);
//       return;
//     }
//     (async () => {
//       setLoading(true);
//       const result = await FetchData(`search?q=${currentSearchTerm}`);
//       setLoading(false);
//       if (!result.success) {
//         setSearchResult("notFound");
//       } else {
//         setSearchResult(result.data);
//       }
//     })();
//   }, [currentSearchTerm]);

//   const handleClose = () => {
//     dispatch(clearSearchTerm());
//     onClose();
//   };

//   const categoryItems = searchResult?.categories?.map((item) => {
//     return (
//       <div
//         onClick={() => {
//           navigate(`/products/${item._id}/${item.title.replaceAll(' ', '-')}`);
//           handleClose(); // Use handleClose to also clear the search term
//         }}
//         key={item._id}
//         className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 active:scale-95 transition cursor-pointer"
//       >
//         <img
//           src={import.meta.env.VITE_BASE_FILE + item.image}
//           alt={item.title}
//           className="w-10 h-10 rounded-md object-cover"
//         ></img>
//         <span className="text-sm font-samim font-medium text-gray-800">
//           {item.title}
//         </span>
//       </div>
//     );
//   });

//   const productsItems = searchResult?.products?.map((item) => {
//     return (
//       <div
//         onClick={() => {
//           navigate(`/product-details/${item._id}/${item.title.replaceAll(' ', '-')}`);
//           handleClose(); // Use handleClose to also clear the search term
//         }}
//         key={item._id}
//         className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 active:scale-95 transition cursor-pointer"
//       >
//         <img
//           src={import.meta.env.VITE_BASE_FILE + item.images[0]}
//           alt={item.title}
//           className="w-10 h-10 rounded-md object-cover"
//         ></img>
//         <span className="text-sm font-samim font-medium text-gray-800">
//           {item.title}
//         </span>
//       </div>
//     );
//   });

//   return (
//     <div className="fixed inset-0 z-50">
//       <div className="absolute inset-0 bg-black/50 " onClick={handleClose}></div> {/* Use handleClose here too */}

//       <div
//         className={`absolute bottom-0 w-full h-screen bg-white rounded-t-3xl p-3 ${isSearchPageVisible ? "animate-slideUp" : "animate-slideDown"} `}
//       >
//         <div className="flex items-center justify-between gap-2 mb-4">
//           <div className="relative w-full">
//             <input
//               type="text"
//               autoFocus
//               value={currentSearchTerm} // Bind input value to Redux state
//               onChange={(e)=>{dispatch(setSearchTerm(e.target.value))}} // Use the handler that dispatches to Redux
//               placeholder="جستجو در دیجیتال لند"
//               className="w-full bg-[#f0f0f1] h-11 rounded-full pr-10 pl-4 placeholder:text-[15px] outline-0 focus:ring-1 focus:ring-gray-300 transition-all font-samim"
//             />
//             <div className="absolute top-1/2 -translate-y-1/2 px-4">
//               <BiSearch className="text-xl text-gray-500" />
//             </div>
//           </div>

//           <div
//             onClick={handleClose} // Use handleClose
//             className="flex justify-end my-4 cursor-pointer"
//           >
//             <BiArrowBack className="text-[22px] " />
//           </div>
//         </div>

//       <div className="overflow-y-auto h-[90%] space-y-2">
//            {loading && (
//             <div className="text-center text-gray-400 py-6 font-samim font-medium">
//               در حال جستجو...
//             </div>
//           )}

//           {searchResult === "notFound" && (
//             <div className="text-center text-gray-400 py-6 font-samim font-medium">
//               نتیجه‌ای یافت نشد
//             </div>
//           )}

//           {searchResult?.categories?.length>0 &&
//           <div className="flex flex-col w-full gap-3 mt-4">
//             <h3 className="text-sm text-gray-800 font-samim font-medium">دسته بندی</h3>
//             <div className="flex flex-col gap-2">
//               {categoryItems}
//             </div>
//           </div>
//           }

//             {searchResult?.products?.length>0 &&
//           <div className="flex flex-col w-full gap-3 mt-4">
//             <h3 className="text-sm text-gray-800 font-samim font-medium">محصولات</h3> {/* Corrected title */}
//             <div className="flex flex-col gap-2">
//               {productsItems}
//             </div>
//           </div>
//           }
//       </div>

//       </div>
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { BiArrowBack, BiSearch } from "react-icons/bi";
// import { useNavigate } from "react-router-dom";
// import FetchData from "../../../Utils/FetchData";

// export default function MobileSearch({ onClose, isSearchPageVisible }) {
//   const navigate = useNavigate();

//   const [searchInp, setSearchInp] = useState("");
//   const [searchResult, setSearchResult] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // ✅ debounce search
//   useEffect(() => {
//     const delay = setTimeout(async () => {
//       if (searchInp.length < 3) {
//         setSearchResult(null);
//         return;
//       }

//       setLoading(true);
//       const result = await FetchData(`search?q=${searchInp}`);
//       setLoading(false);

//       if (!result.success) {
//         setSearchResult("notFound");
//       } else {
//         setSearchResult(result.data);
//       }
//     }, 500);

//     return () => clearTimeout(delay);
//   }, [searchInp]);

//   return (
//     <div className="fixed inset-0 z-50">
//       {/* overlay */}
//       <div
//         className="absolute inset-0 bg-black/40 backdrop-blur-sm"
//         onClick={onClose}
//       ></div>

//       {/* search panel */}
//       <div
//         className={`absolute bottom-0 w-full h-screen bg-white rounded-t-3xl p-4 transition-all duration-300 ${
//           isSearchPageVisible ? "animate-slideUp" : "animate-slideDown"
//         }`}
//       >
//         {/* header */}
//         <div className="flex items-center gap-3 mb-5">
//           <div
//             onClick={onClose}
//             className="cursor-pointer text-gray-700"
//           >
//             <BiArrowBack className="text-2xl" />
//           </div>

//           <div className="relative w-full">
//             <input
//               type="text"
//               autoFocus
//               value={searchInp}
//               onChange={(e) => setSearchInp(e.target.value)}
//               placeholder="جستجو در دیجیتال لند"
//               className="w-full bg-gray-100 h-11 rounded-full pr-10 pl-4 text-sm outline-none focus:ring-2 focus:ring-gray-300 transition"
//             />
//             <BiSearch className="absolute top-1/2 -translate-y-1/2 right-3 text-xl text-gray-500" />
//           </div>
//         </div>

//         {/* results */}
// <div className="overflow-y-auto h-[80%] space-y-2">

// {loading && (
//   <div className="text-center text-gray-400 py-6">
//     در حال جستجو...
//   </div>
// )}

// {searchResult === "notFound" && (
//   <div className="text-center text-gray-400 py-6">
//     نتیجه‌ای یافت نشد
//   </div>
// )}

//           {/* Categories */}
//           {searchResult?.categories?.length > 0 && (
//             <>
//               <h3 className="text-sm font-bold text-gray-600 mb-2">
//                 دسته‌بندی‌ها
//               </h3>
//               {searchResult.categories.map((item) => (
// <div
//   key={item._id}
//   onClick={() => {
//     navigate(
//       `/products/${item._id}/${item.title.replaceAll(
//         " ",
//         "-"
//       )}`
//     );
//     onClose();
//   }}
//   className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 active:scale-95 transition cursor-pointer"
// >
//                   <img
//                     src={
//                       import.meta.env.VITE_BASE_FILE + item.image
//                     }
//                     className="w-12 h-12 rounded-lg object-cover"
//                   />
//                   <span className="text-sm font-medium text-gray-700">
//                     {item.title}
//                   </span>
//                 </div>
//               ))}
//             </>
//           )}

//           {/* Products */}
//           {searchResult?.products?.length > 0 && (
//             <>
//               <h3 className="text-sm font-bold text-gray-600 mt-4 mb-2">
//                 محصولات
//               </h3>
//               {searchResult.products.map((item) => (
//                 <div
//                   key={item._id}
//                   onClick={() => {
//                     navigate(
//                       `/product-details/${item._id}/${item.title.replaceAll(
//                         " ",
//                         "-"
//                       )}`
//                     );
//                     onClose();
//                   }}
//                   className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 active:scale-95 transition cursor-pointer"
//                 >
//                   <img
//                     src={
//                       import.meta.env.VITE_BASE_FILE + item.images[0]
//                     }
//                     className="w-12 h-12 rounded-lg object-cover"
//                   />
//                   <span className="text-sm font-medium text-gray-700">
//                     {item.title}
//                   </span>
//                 </div>
//               ))}
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
