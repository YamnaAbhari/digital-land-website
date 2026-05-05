import React from 'react'

export default function MobileDiscountCardSkeleton() {
  return (
    <div className="flex items-center justify-center gap-2 w-full h-47.5 bg-white  py-3 px-3 shadow-sm border-b border-gray-300 overflow-hidden animate-pulse">
    <div className="w-28 h-28 shrink-0 bg-gray-200/80 m-2 ">
    </div>


    <div className="flex flex-col justify-between flex-1 p-2 gap-2">
    
      <div className="flex flex-col gap-2">
        <div className="h-4 w-3/4 bg-gray-200/80 rounded-sm"></div>
        <div className="h-4 w-1/2 bg-gray-200/80 rounded-sm"></div>
      </div>

      <div className="flex flex-col items-end justify-end mt-auto gap-3">
        <div className="h-4 w-20 bg-gray-200/80 rounded-sm"></div>
        <div className="h-4 w-25 bg-gray-200/80 rounded-sm"></div>
      </div>

    </div>
  </div>
  )
}
