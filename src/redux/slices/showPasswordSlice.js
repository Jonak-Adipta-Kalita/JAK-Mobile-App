import { createSlice, applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

export const showPasswordSlice = createSlice(
    {
        name: "showPassword",
        initialState: {
            show: false,
        },
        reducer: {
            setShowPassword: (state) => {
                state.show = !state.show;
            },
        },
    },
    applyMiddleware(thunk)
);

export const { setShowPassword } = showPasswordSlice.actions;

export const selectShowPassword = (state) => state.showPassword.show;

export default showPasswordSlice.reducer;
