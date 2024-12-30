import { configureStore } from "@reduxjs/toolkit";
import auctionReducer from "./slices/auctionSlice";
import authReducer from "./slices/authSlice";
import bidReducer from "./slices/bidSlice";
import productReducer from "./slices/productSlice";
import userReducer from "./slices/userSlice";
import categoryReducer from "./slices/categorySlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        product: productReducer,
        auction: auctionReducer,
        bid: bidReducer,
        category: categoryReducer,
    },
});

export default store;