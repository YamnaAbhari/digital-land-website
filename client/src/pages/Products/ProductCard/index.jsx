import React, { useEffect, useState } from "react";
import { handleResize } from "../../../Utils/handleResize";
import MobileProductCard from "./MobileProductCard";
import DesktopProductCard from "./DesktopProductCard";

export default function ProductCard({
    variantIds,
  image,
  title,
  avgRating,
  price,
  priceAfterDiscount,
  discountPercent,
  id,
}) {


  const [isMobile,setIsMobile]=useState(window.innerWidth<640)
  
   useEffect(() => {
    handleResize(setIsMobile,640)
  }, []);
  return (
    <div>
      {isMobile ? (
        <MobileProductCard
        variantIds={variantIds}
          image={image}
          title={title}
          avgRating={avgRating}
          price={price}
          priceAfterDiscount={priceAfterDiscount}
          discountPercent={discountPercent}
          id={id}
        />
      ) : (
        <DesktopProductCard
        variantIds={variantIds}
          image={image}
          title={title}
          avgRating={avgRating}
          price={price}
          priceAfterDiscount={priceAfterDiscount}
          discountPercent={discountPercent}
          id={id}
        />
      )}
    </div>
  );
}
