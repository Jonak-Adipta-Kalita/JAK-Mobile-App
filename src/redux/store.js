import { configureStore } from "@reduxjs/toolkit";
import showPasswordReducer from "./slices/showPasswordSlice";

export const store = configureStore({
    reducer: {
        showPassword: showPasswordReducer,
    },
});
