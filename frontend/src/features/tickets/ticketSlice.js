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

export const createTicket = createAsyncThunk("ticket/create", async (ticketData, thunkAPI) => {
    console.log(ticketData);
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await ticketService.commitTicketCreation(ticketData, token);
    } catch (e) {
        const message = e.response.data.message.toString();
        return thunkAPI.rejectWithValue(message);
    }
});




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
    extraReducers: (builder => {
        builder
            .addCase(createTicket.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createTicket.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(createTicket.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
        })
});


export const { resetFunc } = ticketSlice.actions;
export default ticketSlice.reducer;