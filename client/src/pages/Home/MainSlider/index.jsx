import React, { useEffect, useState } from 'react'
import FetchData from '../../../Utils/FetchData'

export default function MainSlider() {
  const [slider,setSlider]=useState()
  useEffect(()=>{
    (async()=>{
      const result=await FetchData('/slider?')
    })()
  },[])
  return (
    <div></div>
  )
}
