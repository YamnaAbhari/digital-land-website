import React from 'react'

export default function Footer() {
  return (
    <footer className='w-full h-20 space-y-0.5 bg-gray-800 text-center my-auto py-3'>
      <h2 className='text-white '>© {new Date().getFullYear()} Your Company Name. All rights reserved.</h2>
      <div>
         <a href="/privacy" className="text-gray-400 hover:text-white mx-2 cursor-pointer">Privacy Policy</a>
          <a href="/terms" className="text-gray-400 hover:text-white mx-2 cursor-pointer">Terms of Service</a>
      </div>
    </footer>
  )
}
