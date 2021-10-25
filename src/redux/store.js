import { configureStore } from "@reduxjs/toolkit";
import showPasswordReducer from "./slices/showPasswordSlice";
import pushNotificationReducer from "./slices/pushNotificationSlice";

export const store = configureStore({
    reducer: {
        showPassword: showPasswordReducer,
        pushNotification: pushNotificationReducer,
    },
});
