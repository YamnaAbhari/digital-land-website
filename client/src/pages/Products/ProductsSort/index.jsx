// import React from "react";
// import Swiper from "swiper";
// import "swiper/css";
// import "swiper/css/navigation";
// import { SwiperSlide } from "swiper/react";
// import SortIcon from "../../../assets/svg/SortIcon";

// export default function ProductsSort({ sort, setSort }) {
//   const handleValue = () => {
//     setSort(value);
//   };

//     const sortOptions = [
//     { label: 'پر امتیاز ترین', value: '-avgRating' },
//     { label: 'پرفروش ترین', value: '-boughtCount' },
//     { label: 'گران ترین', value: '-maxPrice' },
//     { label: 'ارزان ترین', value: 'minPrice' },
//   ];
//   const sortItems=sortOptions.map((option,index)=>{
//     return <SwiperSlide key={option.value} className="w-auto!">
//       <button onClick={()=>handleValue(option.value)} className={`flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-600 whitespace-nowrap transition-all font-samim text-sm text-gray-700 font-normal`}>
//          {index === 0 && <SortIcon className="w-4 h-4" />}
//               <span>{option.label}</span>
//       </button>
//     </SwiperSlide>
//   })
//   return (
//     <div>
//       <Swiper spaceBetween={10} slidesPerView="auto">
//        {sortItems}
//       </Swiper>
//     </div>
//   );
// }



import React from "react";
import { Swiper, SwiperSlide } from "swiper/react"; 
import "swiper/css";
import "swiper/css/navigation";
import SortIcon from "../../../assets/svg/SortIcon";

export default function ProductsSort({ sort, setSort }) {
  const handleValue = (value) => {
    setSort(value);
  };

  const sortOptions = [
    { label: "مرتب سازی :", value: "" },
    { label: "پرامتیاز ترین", value: "-avgRating" },
    { label: "پرفروش ترین", value: "-boughtCount" },
    { label: "گران ترین", value: "-maxPrice" },
    { label: "ارزان ترین", value: "minPrice" },
  ];

  const sortItems = sortOptions.map((option, index) => (
    <SwiperSlide key={option.value} className="w-auto!">
      <button
        onClick={() => handleValue(option.value)}
        className={`flex items-center gap-1.5 ${index===0?"px-0":"px-3"} py-1.5 border border-gray-200 rounded-full focus:outline-none focus:border-teal-600 whitespace-nowrap transition-all font-samim text-sm text-gray-700 font-normal ${sort==option.value?"border border-teal-600":""} cursor-pointer ${index===0?"border-0 text-gray-900 ":""}`}
      >
        {index === 0 && <SortIcon color="gray" width={20} height={20}/>}
        <span>{option.label}</span>
      </button>
    </SwiperSlide>
  ));

  return (
    <div>
      <Swiper spaceBetween={10} slidesPerView="auto">
        {sortItems}
      </Swiper>
    </div>
  );
}
