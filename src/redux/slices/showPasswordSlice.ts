import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const showPasswordSlice = createSlice({
    name: "showPassword",
    initialState: {
        show: false,
    },
    reducers: {
        setShowPassword: (state) => {
            state.show = !state.show;
        },
    },
});

export const { setShowPassword } = showPasswordSlice.actions;

export const selectShowPassword = (state: RootState) => state.showPassword.show;

export default showPasswordSlice.reducer;
