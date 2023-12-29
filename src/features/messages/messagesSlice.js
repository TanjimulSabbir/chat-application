import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    auth: ""
}

const messagesSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

    }
});

export const { } = messagesSlice.actions;
export default messagesSlice.reducer;