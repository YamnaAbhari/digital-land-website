import React, { useEffect, useState } from "react";
import FetchData from "../../Utils/FetchData";
import MainSlider from "./MainSlider";
import Discountproduct from "./DiscountProduct";
import CategorySection from "./CategorySection";

export default function Home() {
  return(
  <>
  <MainSlider/>
  <Discountproduct/>
  <CategorySection/>
  </>
  )
}






