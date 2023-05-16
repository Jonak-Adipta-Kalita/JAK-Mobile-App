import { configureStore } from "@reduxjs/toolkit";
import showPasswordReducer from "./slices/showPasswordSlice";

const store = configureStore({
    reducer: {
        showPassword: showPasswordReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
