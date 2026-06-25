import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import {
  Auth,
  Cart,
  Home,
  NotFound,
  ProductDetails,
  Products,
  Profile,
} from "../pages";
import Protected from "../Layout/Protected";
import UnProtected from "../Layout/UnProtected";
import AuthLayout from "../Layout/AuthLayout";
import MobileSearch from "../Components/Navbar/MobileSearch";
import ProfileLayout from "../Layout/ProfileLayout";
import Mobilecategory from "../pages/MobileCategory";
import AllDiscountProducts from "../pages/AllDiscountProducts";
  const router = createBrowserRouter([
      {
        element: <Layout />,
        children: [
          {
            index: true, 
            element: <Home />,
          },
          {
            element: <Protected />,
            children: [
            
              {
                path: "cart",
                element: <Cart />,
              },
            ],
          },
          { path: "brand/:brandId/:brandName", element: <Products/> },
          {
            path: "products/:categoryId/:categoryName",
            element: <Products />,
          },
          //   {
          //   path: "products/brand/:brandId",
          //   element: <Products />,
          // },
          {
            path: "product-details/:id/:name",
            element: <ProductDetails />,
          },
            {
            path: "incredible-offers",
            element: <AllDiscountProducts />,
          },
          {
            path:"search",
            element:<MobileSearch/>
          },
          {
            path:"category",
            element:<Mobilecategory/>
          },
          {
            path: "*", 
            element: <NotFound />,
          },
        ],
      },
      {
        element: <AuthLayout />,
        children: [
          {
            element: <UnProtected />,
            children: [
              {
                path: "auth",
                element: <Auth />,
              },
            ],
          },
        ],
      },
      {
        element:<ProfileLayout/>,
        children:[
          {
            element:<Protected/>,
            children:[
              {
                path:"profile",
                element:<Profile/>
              }
            ]
          }
        ]
      }
    ]);



export default router;


