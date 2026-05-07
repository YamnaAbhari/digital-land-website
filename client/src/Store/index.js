import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from  './AuthSlice'
import cartSliceReducer from  './CartSlice'
import searchSliceReducer from './SearchSlice'
const store=configureStore({
    reducer:{
        auth:authSliceReducer,
        cart:cartSliceReducer,
        search:searchSliceReducer
    }
})
export default store