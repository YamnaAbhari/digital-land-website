import React from 'react'

export default function DesktopProductCardSkeleton() {
  return (
    <div className='relative w-full h-112.5 rounded-lg shaow-lg border border-gray-200 px-2 py-4 cursor-pointer transition-all duration-200 ease-in-out hover:translate-z-px hover:z-1 hover:shadow-xl bg-white" animate-pulse'>
        <div className='sm:w-50 sm:h-50 md:w-55 md:h-55 lg:w-55 lg:h-55 xl:w-50 xl:h-50 mx-auto mt-8 bg-gray-200/60'></div>
        <div className='mt-6 px-2'>
            <div className='flex flex-col gap-3'>
                <div className='w-full h-4 bg-gray-200/60 rounded-sm'></div>
                <div className='w-30 h-4 bg-gray-200/60 rounded-sm'></div>
            </div>

            <div className='flex flex-col items-end gap-6 mt-8'>
                <div className='w-35 h-4 bg-gray-200/60 rounded-sm'></div>
                <div className='w-25 h-4 bg-gray-200/60 rounded-sm'></div>
            </div>
        </div>
    </div>
  )
}
