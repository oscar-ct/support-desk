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



export const getUserTickets = createAsyncThunk("ticket/getAll", async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await ticketService.commitGetTickets(token);
    } catch (e) {
        const message = e.response.data.message.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const getUserTicket = createAsyncThunk("ticket/get", async (ticketId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await ticketService.commitGetTicket(ticketId, token);
    } catch (e) {
        const message = e.response.data.message.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const updateUserTicket = createAsyncThunk("ticket/update", async (ticketId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await ticketService.commitUpdateTicket(ticketId, token);
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
/////  PENDING  //////////////////////////
            .addCase(createTicket.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserTickets.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserTicket.pending, (state) => {
                state.isLoading = true;
            })
/////  FULFILLED  ////////////////////////
            .addCase(createTicket.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(getUserTickets.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.tickets = action.payload;
            })
            .addCase(getUserTicket.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.ticket = action.payload;
            })
            .addCase(updateUserTicket.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.tickets.map(function(ticket) {
                    if (ticket._id === action.payload._id) {
                        return ticket.status = "closed";
                    } else {
                        return ticket;
                    }
                });
            })
/////  REJECTED  ////////////////////////
            .addCase(createTicket.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getUserTickets.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getUserTicket.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
        })
});


export const { resetFunc } = ticketSlice.actions;
export default ticketSlice.reducer;