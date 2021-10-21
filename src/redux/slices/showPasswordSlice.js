import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showPassword: null,
};

export const showPasswordSlice = createSlice({
    name: "showPassword",
    initialState,
    reducer: {
        setShowPassword: (state, action) => {
            state.showPassword = action.payload;
        },
    },
});

export const { setShowPassword } = showPasswordSlice.actions;

export const selectShowPassword = (state) => state.showPassword.showPassword;

export default showPasswordSlice.reducer;
