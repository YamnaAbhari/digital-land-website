import React from 'react'

export default function DiscountSkeleton() {
  return (
      <div className="relative w-full h-64 p-2 bg-white rounded-sm shadow animate-pulse cursor-pointer">
      <div className="w-full h-32 bg-gray-200/80 rounded mb-2" />
      <div className="h-4 bg-gray-200 rounded w-full mb-4 mt-4" />

      <div className="flex justify-between items-center">
        <div className="h-4 bg-gray-200 rounded w-10" />
        <div className="h-4 bg-gray-200 rounded w-20" />
      </div>

      <div className="absolute left-2 h-4 bg-gray-200 rounded w-18 mt-3" />
    </div>
  );
  
}
