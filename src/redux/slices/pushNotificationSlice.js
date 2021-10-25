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
                state.show = action.payload.token;
            },
        },
    },
    applyMiddleware(thunk)
);

export const { setToken } = pushNotificationSlice.actions;

export const selectToken = (state) => state.pushNotification.show;

export default pushNotificationSlice.reducer;
