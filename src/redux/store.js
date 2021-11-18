import { configureStore } from "@reduxjs/toolkit";
import showPasswordReducer from "./slices/showPasswordSlice";
import pushNotificationReducer from "./slices/pushNotificationSlice";

const store = configureStore({
    reducer: {
        showPassword: showPasswordReducer,
        pushNotification: pushNotificationReducer,
    },
});

export default store;
