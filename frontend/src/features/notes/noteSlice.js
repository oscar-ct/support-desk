import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import noteService from "./noteService";

const initialState = {
    notes: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}



export const getTicketNotes = createAsyncThunk("notes/getAll", async (ticketId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await noteService.commitGetTicketNotes(token);
    } catch (e) {
        const message = e.response.data.message.toString();
        return thunkAPI.rejectWithValue(message);
    }
});



export const noteSlice = createSlice({
    name: "note",
    initialState,
    reducers: {
        resetFunc: (state) => {
            return initialState
        }
    },
    extraReducers: (builder => {
        builder
            .addCase(getTicketNotes.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTicketNotes.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.notes = action.payload;
            })
            .addCase(getTicketNotes.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    })
});

export const {resetFunc} = noteSlice.actions;
export default noteSlice.reducer;