import { configureStore } from '@reduxjs/toolkit';
import cartReducer from "./features/cart/cartSlice"
import modalReducer from "./features/modal/modalSlice"

//here we pass named export
//configureStore is function and store is entire  state of the app
export const store = configureStore({
    reducer: {
        cart: cartReducer,
        modal:modalReducer,
    },
})