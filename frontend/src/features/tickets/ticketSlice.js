import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import ticketService from "./ticketService";


const initialState = {
    tickets: [],
    ticket: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}










export const ticketSlice = createSlice({
    name: "ticket",
    initialState,
    reducers: {
        resetFunc: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = "";
        }
    },
    extraReducers: {

    },
});


export const { resetFunc } = ticketSlice.actions;
export default ticketSlice.reducer;