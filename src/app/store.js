import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/store/cart-slice";

const store = configureStore({
  reducer: { cart: cartReducer },
});

export default store;
