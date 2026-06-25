import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './Router'
import { Toaster } from 'react-hot-toast'

if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}
export default function App() {
  return (
    <>
    <RouterProvider router={router}/>
    <Toaster/>
    </>
  )
}
