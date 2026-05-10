import React, { useEffect, useState } from 'react'
import { handleResize } from '../../Utils/handleResize'
import MobileFooter from './MobileFooter'
import DesktopFooter from './DesktopFooter'

export default function Footer() {
  const [isMobileSize,setIsMobileSize]=useState(window.innerWidth<1024)

  useEffect(()=>{
    handleResize(setIsMobileSize,1024)
  },[])
  return (
    <>
    {isMobileSize?<MobileFooter/>:<DesktopFooter/>}
    </>
  )
}
