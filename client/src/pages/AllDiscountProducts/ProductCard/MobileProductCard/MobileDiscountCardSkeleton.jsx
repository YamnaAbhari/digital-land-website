import React from 'react'

export default function MobileDiscountCardSkeleton() {
  return (
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
  )
}
