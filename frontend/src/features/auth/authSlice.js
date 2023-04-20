import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import authService from "./authService";

const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}


export const registerUser = createAsyncThunk("auth/register", async (user, thunkAPI) => {
    console.log(user);
    try {
        return await authService.commitRegister(user);
    } catch (e) {
        console.log(e);
        console.log(e.response.error);
        console.log(e.response);
        console.log(e.response.data);
        return thunkAPI.rejectWithValue(e.response.data.toString());
    }
});

export const loginUser = createAsyncThunk("auth/login", async (user, thunkAPI) => {
    console.log(user);
});


export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = "";
        }

    },
    extraReducers: (builder => {

    }),
});

export const {reset} = authSlice.actions;
export default authSlice.reducer;