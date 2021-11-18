import { createSlice, applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

export const pushNotificationSlice = createSlice(
    {
        name: "pushNotification",
        initialState: {
            token: null,
        },
        reducers: {
            setToken: (state, action) => {
                state.token = action.payload.token;
            },
        },
    },
    applyMiddleware(thunk)
);

export const { setToken } = pushNotificationSlice.actions;

export const selectToken = (state) => state.pushNotification.token;

export default pushNotificationSlice.reducer;
