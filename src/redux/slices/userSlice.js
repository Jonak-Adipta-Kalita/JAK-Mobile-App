import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    displayName: null,
    photoURL: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducer: {
        setDisplayName: (state, action) => {
            state.displayName = action.payload;
        },
        setPhotoURL: (state, action) => {
            state.photoURL = action.payload;
        },
    },
});

export const { setDisplayName, setPhotoURL } = userSlice.actions;

export const selectDisplayName = (state) => state.user.displayName;
export const selectPhotoURL = (state) => state.user.photoURL;

export default userSlice.reducer;
