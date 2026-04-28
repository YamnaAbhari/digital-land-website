// // src/components/SearchPage.js (فرض می‌کنیم این مسیر درست است)
// import React from "react";
// import { BiSearch } from "react-icons/bi";
// import { IoCloseCircleOutline } from "react-icons/io5"; 

// export default function SearchPage({ onClose }) {
//   return (
//     <div className="fixed top-0 inset-0 z-70"> {/* inset-0 و z-50 باعث چسبیدن به صفحه و قرار گرفتن در بالاترین لایه می‌شوند */}
//       <div 
//         className="absolute top-0 inset-0 bg-black/50 " 
//         onClick={onClose}
//       ></div>
      
//       {/* animate-slideUp باید در فایل CSS اصلی شما تعریف شده باشد */}
//       <div className="absolute bottom-0 w-full h-[90vh] bg-white rounded-t-3xl p-5 animate-slideUp"> 
//         <div className="flex items-center justify-between mb-4">
//           <div className="relative w-full mr-2">
//             <input
//               type="text"
//               placeholder="جستجو در دیجیتال لند"
//               className="w-full bg-[#f0f0f1] h-11 rounded-full pr-10 pl-4 placeholder:text-[15px] outline-0 focus:ring-1 focus:ring-gray-300 transition-all font-samim"
//             />
//             <div className="absolute top-1/2 -translate-y-1/2 px-4">
//               <BiSearch className="text-xl text-gray-500" />
//             </div>
//           </div>
//           <button onClick={onClose}>
//              <IoCloseCircleOutline className="text-3xl text-gray-500 hover:text-gray-700 transition-all" />
//           </button>
//         </div>
//         {/* اینجا می توان نتایج جستجو را نمایش داد */}
//         <div className="text-center text-gray-500 py-8">
//           نتایج جستجو...
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useEffect } from 'react';
import { BiArrowBack, BiSearch } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';


export default function MobileSearch({ onClose,isSearchPageVisible }) {
  const navigate=useNavigate()

  return (
    <div className="fixed inset-0 z-50" >
      <div
        className="absolute inset-0 bg-black/50 "
        onClick={onClose}
      ></div>

      {/* search box */}
      
      <div className={`absolute bottom-0 w-full h-screen bg-white rounded-t-3xl p-3 ${isSearchPageVisible?"animate-slideUp":"animate-slideDown"} `}
      >
        <div className="flex items-center justify-between gap-2 mb-4">

         
          <div className="relative w-full">
            <input
              type="text"
              autoFocus
              placeholder="جستجو در دیجیتال لند"
              className="w-full bg-[#f0f0f1] h-11 rounded-full pr-10 pl-4 placeholder:text-[15px] outline-0 focus:ring-1 focus:ring-gray-300 transition-all font-samim"
            />
            <div className="absolute top-1/2 -translate-y-1/2 px-4">
              <BiSearch className="text-xl text-gray-500" />
            </div>
          </div>

          {/* close search page*/}
          <div onClick={onClose} className="flex justify-end my-4 cursor-pointer"><BiArrowBack className="text-[22px] "/></div>
        </div>
        
        
        <div className="text-center text-gray-500 py-8">
          نتایج جستجو...
        </div>
      </div>
    </div>
  );
}


