// import React from 'react'

// export default function DesktopPriceFilter({priceInputValues,onPriceInputChange,resetPriceFilter}) {
//     const getInputClass = (value) => 
//     `px-2 w-full py-2 border-b border-gray-300  text-left rounded-md focus:outline-none text-[20px] font-samim font-bold text-gray-700 
//     `;
//        const formattedPrice = (value) => {
//     return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//   };
//   return (
//     <div className='mt-3'>
//       <h2  className='text-[24px] font-samim font-bold text-gray-800' onClick={resetPriceFilter}>فیلتر</h2>
//     <div className='mt-8'>
//     <h3 className="text-[18px] font-bold text-gray-600 font-samim" >محدوده قیمت</h3>
//       <div className="flex flex-col gap-8 px-3 w-full mt-4">
//         <div className='flex gap-2 w-full justify-between items-center'>
//         <span className='text-sm font-samim font-medium text-gray-900'>از</span>
//         <input
//           id="min-price-input"
//           type="text" 
//           placeholder=""
//           value={formattedPrice(priceInputValues[0])} 
//           onChange={(e) => onPriceInputChange(0, e.target.value)} 
//           className={getInputClass(priceInputValues[0])}
//         />
//         <span className='text-sm font-samim font-medium text-gray-900'>تومان</span>
//         </div>

//         <div className='flex gap-2 w-full justify-between items-center'>
//          <span className='text-sm font-samim font-medium text-gray-900'>تا</span>
//         <input
//           id="max-price-input"
//           type="text" 
//           placeholder=""
//           value={formattedPrice(priceInputValues[1])}
//           onChange={(e) => onPriceInputChange(1, e.target.value)}
//           className={getInputClass(priceInputValues[1])}
//         />
//         <span className='text-sm font-samim font-medium text-gray-900'>تومان</span>
//       </div>
//       </div>
      
//     </div>
//     </div>
//   )
// }


import React from 'react'

export default function DesktopPriceFilter({
  priceInputValues,
  onPriceInputChange,
  resetPriceFilter
}) {
  const getInputClass = () =>
    `px-2 w-full py-2 border-b border-gray-300 text-left rounded-md 
     focus:outline-none text-[20px] font-samim font-bold text-gray-700`;

  const formattedPrice = (value) => {
    if (value === "" || value === null || value === undefined) return "";
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleChange = (index, value) => {
    const rawValue = value.replace(/,/g, ""); 
    onPriceInputChange(index, rawValue);
  };

  return (
    <div className='mt-3'>
      <div className='flex justify-between items-center w-full px-2'>
      <h2
        className='text-[24px] font-samim font-bold text-gray-800'
        onClick={resetPriceFilter}
      >
        فیلتر
      </h2>

      <button onClick={resetPriceFilter} className=' rounded-lg text-teal-600 font-samim font-bold text-sm cursor-pointer'>حذف فیلتر ها</button>
      </div>

      <div className='mt-8'>
        <h3 className="text-[18px] font-bold text-gray-600 font-samim">
          محدوده قیمت
        </h3>

        <div className="flex flex-col gap-8 px-3 w-full mt-4">
          <div className='flex gap-2 w-full justify-between items-center'>
            <span className='text-sm font-samim font-medium text-gray-900'>از</span>
            <input
              id="min-price-input"
              type="text"
              value={formattedPrice(priceInputValues[0])}
              onChange={(e) => handleChange(0, e.target.value)}
              className={getInputClass()}
            />
            <span className='text-sm font-samim font-medium text-gray-900'>تومان</span>
          </div>

          <div className='flex gap-2 w-full justify-between items-center'>
            <span className='text-sm font-samim font-medium text-gray-900'>تا</span>
            <input
              id="max-price-input"
              type="text"
              value={formattedPrice(priceInputValues[1])}
              onChange={(e) => handleChange(1, e.target.value)}
              className={getInputClass()}
            />
            <span className='text-sm font-samim font-medium text-gray-900'>تومان</span>
          </div>
        </div>
      </div>
    </div>
  )
}
