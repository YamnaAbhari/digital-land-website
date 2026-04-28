// import React from 'react'

// export default function Mobilecategory() {
//   return (
//     <div>index</div>
//   )
// }

// import { useEffect, useState } from "react";
// import { categories } from "../../data/categories";
// import { useNavigate } from "react-router-dom";

// export default function CategoryMenu() {
//   const [activeCategory, setActiveCategory] = useState(null);
//   const navigate=useNavigate()

//   // ✅ ناظر روی تغییر اندازه صفحه
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth > 1020) {
//        navigate(-1)
//       }
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, [navigate]);

//   return (
//     <div className="w-80 bg-white shadow-lg rounded-xl p-4">

//       {categories.map((cat) => (
//         <div key={cat.id} className="mb-2">

//           {/* عنوان کتگوری */}
//           <button
//             onClick={() =>
//               setActiveCategory(
//                 activeCategory === cat.id ? null : cat.id
//               )
//             }
//             className="w-full text-right p-3 hover:bg-gray-100 rounded-lg transition font-medium"
//           >
//             {cat.name}
//           </button>

//           {/* برندها */}
//           <div
//             className={`overflow-hidden transition-all duration-300 ${
//               activeCategory === cat.id
//                 ? "max-h-40 opacity-100"
//                 : "max-h-0 opacity-0"
//             }`}
//           >
//             <ul className="pr-4 mt-2 space-y-2 text-sm text-gray-600">
//               {cat.items.map((brand, index) => (
//                 <li
//                   key={index}
//                   className="hover:text-red-500 cursor-pointer transition"
//                 >
//                   {brand}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }




import React, { use, useEffect, useState } from "react";
import { categories } from "../../data/categories"; 
import { useNavigate } from "react-router-dom";

export default function CategoryMenu() {
  const [openCategories, setOpenCategories] = useState([]);
  const navigate=useNavigate()

  //open category options
  const handleToggleCategory = (categoryId) => {
    setOpenCategories((prevOpenIds) => {
   return prevOpenIds.includes(categoryId)
        ? prevOpenIds.filter((id) => id !== categoryId)
        : [...prevOpenIds, categoryId];
    });
  };

  //close category page in desktop size
  useEffect(()=>{
    const handleSize=()=>{
      if(window.innerWidth>=1024){
        navigate(-1)
      }
    }
    window.addEventListener('resize',handleSize)
    return()=>window.removeEventListener('resize',handleSize)
  },[])

  return (
    <div className="mt-25">
      {categories.map((cat) => {
        const isOpen=openCategories.includes(cat.id)

        return (
          <div key={cat.id} className="border-b border-gray-200 px-4">
            <div
              onClick={() => handleToggleCategory(cat.id)}
              className="w-full flex justify-between items-center py-3 cursor-pointer"
            >
              <h3 className="text-sm font-samim font-medium">
                {cat.name}
              </h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className={`w-5 h-5 opacity-70 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            {isOpen && (
              <ul className="flex flex-col pb-3 ">
                {cat.items.map((item, index) => {
                  return (
                    <li key={index} className="py-1">
                      <a
                        href="#"
                        className="text-teal-700 font-medium text-[13px] "
                      >
                        {item}
                      </a>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}





// import React, { useState } from "react";
// import { categories } from "../../data/categories";

// export default function CategoryMenu() {
//   const [activeCategory, setActiveCategory] = useState(null);

//   const handleActiveCategory = (categoryId) => {
//     setActiveCategory((prevId) => (prevId === categoryId ? null : categoryId));
//   };

//   return (
//     <div className="mt-25">
//       {categories.map((cat) => {

//         const isOpen = activeCategory === cat.id;

//         return (
//           <div key={cat.id} className="border-b border-gray-200 px-3">
//             <div
//               onClick={() => handleActiveCategory(cat.id)}
//               className="w-full flex justify-between items-center py-3 cursor-pointer"
//             >
//               <h3 className="text-sm text-gray-800 font-samim font-medium">
//                 {cat.name}
//               </h3>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//                 // شرط را بر اساس isOpen تغییر دادیم
//                 className={`w-5 h-5 opacity-70 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </div>

//             {/* شرط نمایش را بر اساس isOpen تغییر دادیم */}
//             {isOpen && (
//               <ul className="flex flex-col pb-3">
//                 {cat.items.map((item, index) => {
//                   return (
//                     <li key={index} className="py-1">
//                       <a
//                         href="#"
//                         className="text-gray-700 font-medium text-[13px] hover:text-teal-600"
//                       >
//                         {item}
//                       </a>
//                     </li>
//                   );
//                 })}
//               </ul>
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// }