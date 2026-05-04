import React from 'react'

export default function MobileProductCardSkeletom() {
  return (
    // <div className='flex items-center justify-center gap-2 h-47.5 w-full border-b border-gray-200 py-3 px-3 animate-pulse'>
    //     <div className='flex flex-col items-center justify-center gap-1 bg-gray-200/80 w-30 h-30'></div>
    //     <div className='w-full flex h-full items-end mb-2'>
    //         <div className='w-full h-6 rounded-md bg-gray-200/80'></div>
    //         <div className='w-100 h-6 rounded-md bg-gray-200/80'></div>
    //     </div>
    //     <div className='flex justify-between w-full'>
    //         <div className='w-80 h-5 rounded-md bg-gray-200/80'></div>
    //         <div className='w-50 h-5 rounded-md bg-gray-200/80'></div>
    //     </div>
    // </div>

    // <div className="flex items-center justify-center w-full h-47.5">
  <div className="flex items-center justify-center gap-2 w-full h-47.5 bg-white  py-3 px-3 shadow-sm border-b border-gray-300 overflow-hidden animate-pulse">
    
    {/* بخش تصویر محصول (سمت چپ) */}
    <div className="w-28 h-28 shrink-0 bg-gray-200/80 m-2 ">
      {/* اگر می‌خوای تصویر گرد باشه، کلاس rounded-md رو به rounded-full تغییر بده */}
    </div>

    {/* بخش اطلاعات محصول (سمت راست) */}
    <div className="flex flex-col justify-between flex-1 p-2 gap-2">
      
      {/* عنوان محصول */}
      <div className="flex flex-col gap-2">
        <div className="h-4 w-3/4 bg-gray-200/80 rounded-sm"></div>
        <div className="h-4 w-1/2 bg-gray-200/80 rounded-sm"></div>
      </div>

      {/* قیمت و تخفیف */}
      <div className="flex flex-col items-end justify-end mt-auto gap-3">
        <div className="h-4 w-20 bg-gray-200/80 rounded-sm"></div>
        <div className="h-4 w-25 bg-gray-200/80 rounded-sm"></div>
      </div>

    </div>
  </div>
// </div>

  )
}
