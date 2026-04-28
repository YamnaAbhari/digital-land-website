import React, { useEffect, useState } from 'react'
import FetchData from '../../../Utils/FetchData'
import CategoryCard from './CategoryCard'

export default function CategorySection() {
    const [categories,setCategories]=useState([])
    useEffect(()=>{
        (async()=>{
            const result=await FetchData('categories?page=1&limit=12')
            setCategories(result.data)
        })()
    },[])
    
    const categoryItem=categories.map(cat=>{
      return <CategoryCard key={cat._id} id={cat._id} title={cat.title} image={cat.image}></CategoryCard>
    })
  return (
    <div className='mt-45 w-full grid sm:grid-cols-6 grid-cols-3 gap-6 px-3 sm:px-6'>
        {categoryItem}
    </div>
  )
}
