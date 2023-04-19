import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}


export const registerUser = createAsyncThunk("auth/register", async (user, thunkAPI) => {
    console.log(user);
});

export const loginUser = createAsyncThunk("auth/login", async (user, thunkAPI) => {
    console.log(user);
});


export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder => {
        // todo
    }),
});

export default authSlice.reducer;