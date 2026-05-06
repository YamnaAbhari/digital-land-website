import React from 'react'
import { IoClose } from 'react-icons/io5';

export default function MobilePriceFilter({closeFilterBox,priceInputValues,onPriceInputChange,isFilterBoxVisible,resetPriceFilter}) {
      const getInputClass = (value) => 
    `px-2 w-full py-2 border-b border-gray-300  text-left rounded-md focus:outline-none text-[20px] font-samim font-bold text-gray-700 
   `;

     const formattedPrice = (value) => {
    if (value === "" || value === null || value === undefined) return "";
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleChange = (index, value) => {
    const rawValue = value.replace(/,/g, ""); 
    onPriceInputChange(index, rawValue);
  };
  return (
        <div className={`fixed inset-0 z-50`}>
 <div
        className="absolute inset-0  bg-black/40 "
        onClick={closeFilterBox}
      ></div>
          <div className={`absolute rounded-tl-lg rounded-tr-lg bottom-0 left-0 bg-white w-full h-auto  ${isFilterBoxVisible?"filter-Box-animate-slideUp":"filter-Box-animate-slieDown"}`}>
            <div className='flex justify-between items-center w-full px-4 py-4 mb-4 border-b border-gray-300'>
      <h3 className="text-[18px] font-bold text-gray-600 font-samim" >محدوده قیمت</h3>
      <IoClose onClick={closeFilterBox} className="text-[20px] text-gray-700 cursor-pointer" />
      </div>
      <div className="flex flex-col gap-8 px-6 w-full">
        <div className='flex gap-2 w-full justify-between items-center'>
        <span className='text-sm font-samim font-medium text-gray-900'>از</span>
        <input
          id="min-price-input"
          type="text" 
          placeholder=""
          value={formattedPrice(priceInputValues[0])} 
          onChange={(e) => handleChange(0, e.target.value)} 
          className={getInputClass(priceInputValues[0])}
        />
        <span className='text-sm font-samim font-medium text-gray-900'>تومان</span>
        </div>

        <div className='flex gap-2 w-full justify-between items-center'>
         <span className='text-sm font-samim font-medium text-gray-900'>تا</span>
        <input
          id="max-price-input"
          type="text" 
          placeholder=""
          value={formattedPrice(priceInputValues[1])}
          onChange={(e) => onPriceInputChange(1, e.target.value)}
          className={getInputClass(priceInputValues[1])}
        />
        <span className='text-sm font-samim font-medium text-gray-900'>تومان</span>
      </div>
      </div>
       
       <button onClick={resetPriceFilter} className='my-6 px-3 py-1  rounded-lg text-teal-600 font-samim font-bold text-sm cursor-pointer'>حذف فیلتر </button>
      </div>
      
    </div>
  )
}
