import { createSlice } from "@reduxjs/toolkit";

export const showPasswordSlice = createSlice({
    name: "showPassword",
    initialState: {
		show: false,
	},
    reducer: {
        setShowPassword: (state) => {
            state.show = !state.show;
        },
    },
});

export const { setShowPassword } = showPasswordSlice.actions;

export const selectShowPassword = (state) => state.showPassword.show;

export default showPasswordSlice.reducer;
