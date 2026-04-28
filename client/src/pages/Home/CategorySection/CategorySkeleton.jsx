import React from 'react';

export default function CategorySkeleton() {
  return (
    <div
      className="w-full flex flex-col justify-center items-center gap-4"
      aria-busy="true" 
    >
      <div className="lg:w-28 lg:h-28 sm:w-24 sm:h-24 w-22 h-22 flex justify-center items-center bg-gray-200 rounded-full animate-pulse">
      
      </div>
      
    
      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
    </div>
  );
}
