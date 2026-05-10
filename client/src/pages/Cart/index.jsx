import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { colorNameById } from '../../data/colorMap';
import { addToCart, removeFromCart } from '../../Store/CartSlice';
import { BiPlus, BiTrash } from 'react-icons/bi';

export default function Cart() {
  const {items,totalPrice, totalPriceAfterDiscount}=useSelector(state=>state.cart)
  const [isMobile,setIsMobile]=useState(window.innerWidth<640)
  const dispatch = useDispatch();
  const navigate = useNavigate();

    const formattedPrice = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

console.log(items)
  const cartItems=items.map((item,index)=>{
    return <div  onClick={() =>
          navigate(
            `/product-details/${item.productId._id}/${item.productId.title.replace(' ','-')}`
          )
        }  key={index} className='flex gap-4 border-b border-gray-200'>
      <div className='flex flex-col gap-2 items-center mb-3'>
      <img className='w-28.5 h-28.5' src={import.meta.env.VITE_BASE_FILE+item.productId.images[0]} alt={item.productId.title.split(' ').slice(0,4).join(' ')}></img>

      {/* increase or decrease quantity */}
           <div className="flex gap-3  items-center justify-center w-25.5 h-11 rounded-lg border border-gray-300 mt-2">
                        <button
                          onClick={() => {
                            dispatch(addToCart(item));
                          }}
                          disabled={item.cartQuantity==item.quantity}
                          className="text-[20px] text-teal-600 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          <BiPlus />
                        </button>
                        <span className="font-samim font-bold text-gray-600">
                          {item.cartQuantity}
                        </span>
          
                        <button
                          className="text-[18px] text-teal-600 cursor-pointer "
                          onClick={() => {
                            dispatch(removeFromCart(item._id));
                          }}
                        >
                          <BiTrash />
                        </button>
                      </div>
      </div>
      <div>
        <h2 className='font-samim  sm:text-lg text-[16px] text-gray-700 font-semibold mb-2'>{item.productId.title}</h2>
         <span className='text-gray-500 font-samim text-sm '>{`رنگ:${colorNameById[item.variantId]}`}</span>
         <div className='flex flex-col gap-2 mt-7'>
          {item.discountPercent>0&& <h3 className='text-teal-600 font-samim font-semibold text-sm'>{formattedPrice((item.price * item.discountPercent / 100).toFixed(0))} <span className='text-[10px] '>تومان تخفیف</span></h3>}
           {item.discountPercent>0? <h3 className='font-samim font-bold text-gray-800 text-[16px]'>{formattedPrice(item.priceAfterDiscount)} <span className='text-gray-500 font-samim text-sm'>تومان</span></h3>:<h3 className='font-samim font-bold text-gray-800 text-[16px]'>{formattedPrice(item.price)} <span className='text-gray-500 font-samim text-sm'>تومان</span></h3>}   
         </div>
      </div>
    </div>

  })
  return (
    <div className='md:mt-35 mt-30 lg:mx-40 sm:mx-10 mx-5 flex lg:flex-row lg:justify-center lg:items-start items-center  flex-col lg:gap-2 gap-4'>
      <div className='flex flex-col gap-6 flex-1'>{cartItems}</div>
      <div className='w-75 h-54 border border-gray-200 rounded-lg px-7 flex flex-col gap-5 justify-center'>
         <div className='flex justify-between items-center '>
          <h3 className='text-sm font-samim font-semibold text-gray-500'>{`قیمت کالاها (${items.length})`}</h3>
          <h3 className='text-[16px] font-samim font-bold text-gray-700'>{formattedPrice(totalPrice)} <span className='text-[10px] font-samim font-medium'>تومان</span></h3>
         </div>
         <div className='flex justify-between items-center'>
          <h3 className='text-sm font-samim font-semibold text-gray-500'>جمع سبد خرید</h3>
          <h3 className='text-[16px] font-samim font-bold text-gray-700'>{formattedPrice(totalPriceAfterDiscount)} <span className='text-[10px] font-samim font-medium'>تومان</span></h3>
         </div>
         
         <button className='w-full h-10 bg-teal-600 text-white font-samim text-[16px] font-medium rounded-lg cursor-pointer mt-5'>تایید و تکمیل سفارش</button>
      </div>
    </div>
  )
}
