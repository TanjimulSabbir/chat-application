import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    auth: ""
}

const conversationsSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

    }
});

export const { } = conversationsSlice.actions;
export default conversationsSlice.reducer;