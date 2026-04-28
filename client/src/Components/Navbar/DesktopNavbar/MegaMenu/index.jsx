// // import React, { useState, useRef, useEffect } from 'react';

// // const MegaMenu = () => {
// //    const categories = [
// //     { id: 1, name: 'کالای دیجیتال', items: ['موبایل', 'تبلت', 'لپ‌تاپ', 'ساعت هوشمند', 'هدفون', 'اسپیکر'] },
// //     { id: 2, name: 'پوشاک', items: ['لباس زنانه', 'لباس مردانه', 'لباس بچگانه', 'کیف و کفش'] },
// //     { id: 3, name: 'خانه و آشپزخانه', items: ['ظروف', 'لوازم برقی', 'دکوری', 'منسوجات'] },
// //     { id: 4, name: 'کتاب', items: ['داستان', 'علمی', 'تاریخی', 'روانشناسی', 'کودک و نوجوان'] },
// //     { id: 5, name: 'زیبایی و بهداشت', items: ['لوازم آرایشی', 'عطر', 'محصولات پوستی', 'ابزار بهداشتی'] },
// //     { id: 6, name: 'ورزش و سفر', items: ['لوازم ورزشی', 'کفش ورزشی', 'چادر مسافرتی'] },
// //   ];
// //   const [isOpen, setIsOpen] = useState(false); // state isOpen اکنون در داخل MegaMenu مدیریت می‌شود
// //   const menuRef = useRef(null);
// //   const timeoutRef = useRef(null); // برای نگهداری شناسه setTimeout

// //   // --- مدیریت اسکرول بر اساس وضعیت isOpen ---
// //   useEffect(() => {
// //     if (isOpen) {
// //       document.body.style.overflow = 'hidden';
// //     } else {
// //       document.body.style.overflow = 'auto';
// //     }
// //     // پاکسازی در زمان unmount شدن کامپوننت
// //     return () => {
// //       document.body.style.overflow = 'auto';
// //     };
// //   }, [isOpen]); // وابسته به isOpen

// //   // --- تابع برای بستن منو (با تاخیر) ---
// //   const closeMenu = () => {
// //     // پاک کردن تایمر قبلی اگر وجود دارد
// //     if (timeoutRef.current) {
// //       clearTimeout(timeoutRef.current);
// //     }
// //     // تنظیم یک تایمر جدید برای بستن منو
// //     timeoutRef.current = setTimeout(() => {
// //       setIsOpen(false);
// //     }, 100); // تاخیر 200 میلی‌ثانیه
// //   };

// //   // --- تابع برای باز کردن منو ---
// //   const openMenu = () => {
// //     // پاک کردن تایمر بستن اگر موس دوباره وارد محدوده شد
// //     if (timeoutRef.current) {
// //       clearTimeout(timeoutRef.current);
// //       timeoutRef.current = null; // ریست کردن ref
// //     }
// //     setIsOpen(true);
// //   };

// //   return (
// //     <div
// //       className="relative inline-block px-5"

// //     >
// //       <button
// //         className="flex items-center font-samim font-bold text-gray-700"
// //         // اگر بخواهید با کلیک هم باز و بسته شود:
// //         // onClick={() => setIsOpen(!isOpen)}
// //       >
// //         <span class="relative cursor-pointer ml-2 pt-2 pb-1 group"  ref={menuRef}
// //       onMouseEnter={openMenu} // باز کردن منو با ورود موس
// //       onMouseLeave={closeMenu} >
// //   دسته بندی کالا ها

// //   <span class="absolute bottom-0 right-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
// // </span>

// //         <svg
// //           xmlns="http://www.w3.org/2000/svg"
// //           viewBox="0 0 20 20"
// //           fill="currentColor"
// //           className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
// //         >
// //           <path
// //             fillRule="evenodd"
// //             d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
// //             clipRule="evenodd"
// //           />
// //         </svg>
// //       </button>

// //       {isOpen && (
// //         <div
// //           className="absolute z-50  bg-white shadow-xl rounded-lg p-4 sm:p-6 grid gap-4 sm:gap-6 transition-all duration-500 ease-in-out"
// //           style={{
// //             width: 'min(70vw, 1000px)',
// //             right: '0',
// //             gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
// //             // transition: 'opacity 0.3s ease, transform 0.3s ease',
// //             opacity: 1,
// //           }}
// //           // --- event handlers برای خود منو ---
// //           onMouseEnter={openMenu} // نگه داشتن منو باز تا موس روی آن است
// //           onMouseLeave={closeMenu} // بستن منو پس از خروج از آن (با تاخیر)
// //         >
// //           {categories.map((category) => (
// //             <div key={category.id} className="flex flex-col">
// //               <h3 className="font-samim font-bold text-md sm:text-lg mb-2 sm:mb-3 text-teal-700 border-b pb-1 sm:pb-2">
// //                 {category.name}
// //               </h3>
// //               <ul className="space-y-1 sm:space-y-2">
// //                 {category.items.map((item, index) => (
// //                   <li key={index}>
// //                     <a href="#!" className="text-gray-600 hover:text-teal-500 font-samim text-sm block py-0.5 sm:py-1">
// //                       {item}
// //                     </a>
// //                   </li>
// //                 ))}
// //               </ul>
// //             </div>
// //           ))}
// //         </div>
// //       )}

// //       {/* --- Overlay --- */}
// //       {isOpen && (
// //         <div
// //           className="fixed inset-0 z-45 top-27 bg-black opacity-50 transition-opacity duration-300"
// //           onClick={closeMenu}
// //         ></div>
// //       )}
// //     </div>
// //   );
// // };

// // export default MegaMenu;

// import React, { useEffect, useRef, useState } from "react";

// export default function MegaMenu() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [groupHoverActive, setGroupHoverActive] = useState(false);
//   const timeoutRef = useRef(null);

//   const categories = [
//     {
//       id: 1,
//       name: "انتخاب گوشی",
//       items: ["گوشی اپل(ایفون)", "گوشی سامسونگ", "گوشی شیائومی"],
//     },
//     {
//       id: 2,
//       name: "انتخاب لپ تاپ",
//       items: ["ایسوس", "مک بوک", "سرفیس", "لنوو", "دل", "اچ پی", "ایسر"],
//     },
//     {
//       id: 3,
//       name: "انتخاب تبلت و ایپد",
//       items: ["اپل", "سامسونگ", "بلک ویو", "شیائومی", "تی سی ال"],
//     },
//     {
//       id: 4,
//       name: "انتخاب ایر پاد",
//       items: [
//         "سامسونگ",
//         "اپل",
//         "کیو سی وای",
//         "تی سی اچ",
//         "انکر",
//         "اپولو",
//         "ناتینگ",
//       ],
//     },
//     {
//       id: 5,
//       name: "انتخاب اسپیکر",
//       items: [
//         "جی بی ال",
//         "جدل",
//         "تسکو",
//         "انکر",
//         "کینگ استار",
//         "نورث پلاس",
//         "هیسکا",
//       ],
//     },
//     {
//       id: 6,
//       name: "انتخاب ساعت هوشمند",
//       items: ["اپل", "سامسونگ", "تی سی اچ", "شیائومی", "سونتی می"],
//     },
//   ];

//   useEffect(() => {
//     if (isMenuOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }
//   }, [isMenuOpen]);

//   const handleCloseMenu = () => {
//     if (timeoutRef.current) {
//       clearTimeout(timeoutRef.current);
//     }
//     timeoutRef.current = setTimeout(() => {
//       setIsMenuOpen(false);
//     }, 100);
//     setGroupHoverActive(false);
//   };

//   const handelOpenMenu = () => {
//     if (timeoutRef.current) {
//       clearTimeout(timeoutRef.current);
//       timeoutRef.current = null;
//     }
//     setIsMenuOpen(true);
//     setGroupHoverActive(false);
//   };

//   return (
//     <div className="relative inline-block ">
//       <div onMouseEnter={handelOpenMenu} onMouseLeave={handleCloseMenu}>
//         <div className="relative mr-5 py-2 flex gap-1.5 items-center cursor-pointer"
//         onMouseEnter={()=>{setGroupHoverActive(true)}}
//         onMouseLeave={()=>{setGroupHoverActive(false)}}
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 24 24"
//             className="w-5 h-5 text-gray-700"
//             fill="currentColor"
//           >
//             <path
//               fillRule="evenodd"
//               clipRule="evenodd"
//               d="M19 8V6H5v2h14zm0 3v2H5v-2h14zm0 5v2H5v-2h14z"
//             />
//           </svg>
//           <h2 className="font-samim">دسته بندی کالا ها</h2>
//           <span className={`absolute bottom-0 left-0 h-0.5 bg-teal-600 transition-all duration-300  ${isMenuOpen||groupHoverActive?"w-full":"w-0"}`}></span>
//         </div>
//       </div>

//       {isMenuOpen && (
//         <div
//           className="absolute z-50 w-200 mr-5 px-5 pt-5 bg-white rounded-bl-xl shadow-xl"
//           onMouseEnter={handelOpenMenu}
//           onMouseLeave={handleCloseMenu}
//         >
//           <div
//             className="grid"
//             style={{ gridTemplateColumns: "repeat(3, 200px)" }}
//           >
//             {categories.map((category) => {
//               return (
//                 <div
//                   key={category.id}
//                   className="flex flex-col gap-2 font-samim mb-5"
//                 >
//                   <div className="flex  items-center hover:text-teal-700">
//                     <h3 className="font-bold text-[14px] cursor-pointer">
//                       {category.name}
//                     </h3>
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 20 20"
//                       fill="currentColor"
//                       className={`w-5 h-5 transition-transform duration-200 rotate-90`}
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   </div>
//                   <ul className="flex flex-col">
//                     {category.items.map((item, index) => {
//                       return (
//                         <li key={index}>
//                           <a
//                             href="!#"
//                             target="_blank"
//                             className="text-gray-700 font-medium text-[13px] hover:text-teal-600"
//                           >
//                             {item}
//                           </a>
//                         </li>
//                       );
//                     })}
//                   </ul>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       )}

//       {isMenuOpen && (
//         <div className="fixed inset-0 z-45 top-27 bg-black opacity-50 transition-opacity duration-300"></div>
//       )}
//     </div>
//   );
// }







import React, { useEffect, useRef, useState } from "react";

export default function MegaMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [groupHoverActive, setGroupHoverActive] = useState(false);
  const timeoutRef = useRef(null);

  const categories = [
    {
      id: 1,
      name: "انتخاب گوشی",
      items: ["گوشی اپل(ایفون)", "گوشی سامسونگ", "گوشی شیائومی"],
    },
    {
      id: 2,
      name: "انتخاب لپ تاپ",
      items: ["ایسوس", "مک بوک", "سرفیس", "لنوو", "دل", "اچ پی", "ایسر"],
    },
    {
      id: 3,
      name: "انتخاب تبلت و ایپد",
      items: ["اپل", "سامسونگ", "بلک ویو", "شیائومی", "تی سی ال"],
    },
    {
      id: 4,
      name: "انتخاب ایر پاد",
      items: [
        "سامسونگ",
        "اپل",
        "کیو سی وای",
        "تی سی اچ",
        "انکر",
        "اپولو",
        "ناتینگ",
      ],
    },
    {
      id: 5,
      name: "انتخاب اسپیکر",
      items: [
        "جی بی ال",
        "جدل",
        "تسکو",
        "انکر",
        "کینگ استار",
        "نورث پلاس",
        "هیسکا",
      ],
    },
    {
      id: 6,
      name: "انتخاب ساعت هوشمند",
      items: ["اپل", "سامسونگ", "تی سی اچ", "شیائومی", "سونتی می"],
    },
  ];

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen]);

  const handleCloseMenu = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsMenuOpen(false);
    }, 100);
    setGroupHoverActive(false);
  };

  const handelOpenMenu = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsMenuOpen(true);
    setGroupHoverActive(false);
  };

  return (
    <div className="relative inline-block ">
      <div onClick={handelOpenMenu} onMouseEnter={handelOpenMenu} onMouseLeave={handleCloseMenu}>
        <div className="relative mr-5 py-2 flex gap-1.5 items-center cursor-pointer"
        onMouseEnter={()=>{setGroupHoverActive(true)}}
        onMouseLeave={()=>{setGroupHoverActive(false)}}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-5 h-5 text-gray-700"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M19 8V6H5v2h14zm0 3v2H5v-2h14zm0 5v2H5v-2h14z"
            />
          </svg>
          <h2 className="font-samim">دسته بندی کالا ها</h2>
          <span className={`absolute bottom-0 left-0 h-0.5 bg-teal-600 transition-all duration-300  ${isMenuOpen||groupHoverActive?"w-full":"w-0"}`}></span>
        </div>
      </div>

      {isMenuOpen && (
        <div
          className="absolute z-50 w-200 mr-5 px-5 pt-5 bg-white rounded-bl-xl shadow-xl"
          onMouseEnter={handelOpenMenu}
          onMouseLeave={handleCloseMenu}
        >
          <div
            className="grid"
            style={{ gridTemplateColumns: "repeat(3, 200px)" }}
          >
            {categories.map((category) => {
              return (
                <div
                  key={category.id}
                  className="flex flex-col gap-2 font-samim mb-5"
                >
                  <div className="flex  items-center hover:text-teal-700">
                    <h3 className="font-bold text-[14px] cursor-pointer">
                      {category.name}
                    </h3>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className={`w-5 h-5 transition-transform duration-200 rotate-90`}
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <ul className="flex flex-col">
                    {category.items.map((item, index) => {
                      return (
                        <li key={index}>
                          <a
                            href="!#"
                            target="_blank"
                            className="text-gray-700 font-medium text-[13px] hover:text-teal-600"
                          >
                            {item}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {isMenuOpen && (
        <div className="fixed inset-0 z-45 top-27 bg-black opacity-50 transition-opacity duration-300" onClick={handleCloseMenu}></div>
      )}
    </div>
  );
}
