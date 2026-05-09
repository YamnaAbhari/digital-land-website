import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import FetchData from "../../../Utils/FetchData";
import { Navigation } from "swiper/modules";
import { colorMapById, colorNameById } from "../../../data/colorMap";
import { addToCart, removeFromCart } from "../../../Store/CartSlice";
import { BiPlus, BiTrash } from "react-icons/bi";

export default function MobileProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [productVariant, setProductVariant] = useState();
  const [currentImage, setCurrenImage] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const {token}=useSelector((state)=>state.auth)
  const navigate = useNavigate();
  const location = useLocation();

const handleGoToCart = () => {
  // چک می‌کنیم کاربر لاگین هست یا نه
  if (!token) {
    // آدرس صفحه فعلی (جزئیات محصول) رو به صفحه لاگین می‌فرستیم
    navigate('/auth', { state: { from: location.pathname } });
  } else {
    // اگر لاگین بود، مستقیم به سبد خرید بره
    navigate('/cart');
  }
};
  const formattedPrice = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await FetchData(`products/${id}`);
      const productRes = res?.data[0];
      setProduct(productRes);
      setLoading(false);
      productRes?.productVariantIds?.forEach((item) => {
        if (item._id.toString() == id.toString()) {
          setProductVariant(item);
        }
      });

      if (!productVariant && productRes?.productVariantIds?.length) {
        setProductVariant(productRes?.productVariantIds[0]);
      }
      //  console.log(productRes)
    })();
  }, [id]);

  const imgItems = product?.images?.map((image, index) => {
    return (
      <SwiperSlide key={index} style={{ width: "250px", height: "250px" }}>
        <img
          src={import.meta.env.VITE_BASE_FILE + image}
          alt="تصویر یافت نشد"
          className="w-full h-full rounded-2xl"
        ></img>
      </SwiperSlide>
    );
  });

  const productVariantItems = product?.productVariantIds?.map((prv) => {
    const bgColor = colorMapById[prv.variantId] || "#cccccc";
    const isSelected = productVariant?._id == prv._id;

    return (
      <div
        key={prv._id}
        onClick={() => setProductVariant(prv)}
        className={`
          w-7 h-7 rounded-full cursor-pointer border-2 transition-all duration-200 
          ${isSelected ? "border-teal-200 shadow-md ring-2 ring-indigo-100" : "border border-gray-300 hover:scale-105"}
        `}
        style={{ backgroundColor: bgColor }}
      />
    );
  });

  const selectedVariantData = product?.productVariantIds?.map((vrData) => {
    if (productVariant?._id !== vrData?._id) {
      return null;
    }

    const cartQuantity =
      items?.find((item) => item?._id == vrData._id)?.cartQuantity || 0;

    return (
      <div key={vrData?._id} className="flex flex-col gap-2 mt-3.5">
        {vrData?.discountPercent > 0 && (
          <div className="flex flex-row-reverse justify-end gap-2">
            <del className="font-samim text-sm text-gray-600 font-medium">
              {" "}
              {formattedPrice(vrData?.price)}{" "}
            </del>

            <span className="w-10 h-5 py-0.5 flex items-center justify-center bg-teal-600 text-[12px] font-samim text-white rounded-[14px]">
              {vrData?.discountPercent}%
            </span>
          </div>
        )}

        {vrData?.discountPercent > 0 ? (
          <h2 className="flex w-full gap-0.5 justify-start items-center font-samim text-[20px] font-bold text-gray-700">
            {formattedPrice(vrData?.priceAfterDiscount)}
            <span className="text-sm font-samim ">تومان</span>
          </h2>
        ) : vrData?.price > 0 ? (
          <h2 className="flex w-full gap-0.5 justify-start items-center font-samim text-[20px] font-bold text-gray-700">
            {formattedPrice(vrData?.price)}
            <span className="text-sm font-samim ">تومان</span>
          </h2>
        ) : (
          <h2>ناموجود</h2>
        )}

        {cartQuantity == 0 ? (
          <button
            className="w-74.75 h-12 rounded-lg bg-teal-600 text-white font-samim font-medium cursor-pointer mt-1"
            onClick={() => {
              dispatch(addToCart({ ...vrData, productId: product }));
            }}
          >
            افزودن به سبد خرید
          </button>
        ) : (
          <div className="flex gap-3 items-center">
            <div className="flex gap-3  items-center justify-center w-25.5 h-11 rounded-lg border border-gray-300 mt-2">
              <button
                onClick={() => {
                  dispatch(addToCart({ ...vrData, productId: product }));
                }}
                disabled={cartQuantity == vrData.quantity}
                className="text-[20px] text-teal-600 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <BiPlus />
              </button>
              <span className="font-samim font-bold text-gray-600">
                {cartQuantity}
              </span>

              <button
                className="text-[18px] text-teal-600 cursor-pointer "
                onClick={() => {
                  dispatch(removeFromCart(vrData?._id));
                }}
              >
                <BiTrash />
              </button>
            </div>
            <p
              onClick={handleGoToCart}
              className="font-samim text-sm font-bold cursor-pointer text-teal-600"
            >
              مشاهده سبد خرید
            </p>
          </div>
        )}
      </div>
    );
  });

  const informationItems = product?.information.map((item, index) => {
    return (
      <SwiperSlide key={index} style={{ width: "192px", height: "68px" }}>
        <div className="flex flex-col justify-center gap-1  rounded-lg bg-gray-200/70 px-3 py-2">
          <h2 className="font-samim font-bold text-gray-600 text-[12px]">
            {item?.key}
          </h2>
          <p className="font-samim font-bold text-gray-800 text-[13px]">
            {item?.value}
          </p>
        </div>
      </SwiperSlide>
    );
  });

  return (
    <div className="my-20 ">
      <div className="bg-gray-100 py-8 flex justify-center">
        <Swiper slidesPerView={"auto"} spaceBetween={15} modules={Navigation}>
          {imgItems}
        </Swiper>
      </div>

      <div className="mt-6 mx-4">
        <div className="flex flex-col gap-2 ">
          <h3 className="font-bold font-samim text-[14px] sm:text-[16px] text-teal-600">{`${product?.brandId?.title} / ${product?.categoryId.title}`}</h3>
          <h2 className="font-bold font-samim text-[16px] sm:text-[18px] text-gray-700">
            {product?.title}
          </h2>
        </div>

        <div className="mt-3">
          <h3 className="text-[16px] sm:text-[18px] font-bold font-samim">
            ⭐ {product?.avgRating}{" "}
            <span className="font-samim text-gray-500 font-bold text-[12px] sm:text-[14px]">{`( امتیاز ${product?.ratingCount} خریدار )`}</span>
          </h3>
        </div>

        {/* color */}
        <div className="flex flex-col gap-3 mt-3">
          <div className="flex mt-3 ">
            <h2 className="font-samim font-semibold text-[16px] text-gray-600">
              رنگ:
            </h2>
            {product?.productVariantIds?.map((vr) => {
              const isSelected = productVariant?._id == vr?._id;
              return (
                <div key={vr?._id}>
                  <span className="font-samim font-semibold text-[16px] text-gray-600">
                    {isSelected && colorNameById[vr.variantId]}
                  </span>
                </div>
              );
            })}
          </div>

          <div className=" flex flex-wrap gap-2">{productVariantItems}</div>
        </div>

        <div className="flex justify-start mt-4">{selectedVariantData}</div>

        <div className="flex flex-col gap-3 mt-8">
          <h2 className="font-samim text-lg font-semibold">ویژگی ها</h2>
          <div className="">
            <Swiper slidesPerView={"auto"} spaceBetween={10}>
              {informationItems}
            </Swiper>
          </div>
        </div>

              <div className="mt-8 flex flex-col gap-2">
              <h2 className="font-samim text-lg font-semibold">معرفی</h2>
              <p className="font-samim text-sm text-gray-500 font-semibold">{product?.description}</p>
            </div>
          

      </div>
    </div>
  );
}

// import React from 'react'

// export default function MobileProductDetails() {
//   return (
//     <div>MobileProductDetails</div>
//   )
// }
