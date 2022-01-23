import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const pushNotificationSlice = createSlice({
    name: "pushNotification",
    initialState: {
        token: null,
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload.token;
        },
    },
});

export const { setToken } = pushNotificationSlice.actions;

export const selectToken = (state: RootState) => state.pushNotification.token;

export default pushNotificationSlice.reducer;
