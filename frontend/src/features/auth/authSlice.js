import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import authService from "./authService";


const localStorageUser = JSON.parse(localStorage.getItem("user"));

const initialState = {
    user: localStorageUser ? localStorageUser : null,
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
        const message = e.response.data.message.toString();
        return thunkAPI.rejectWithValue(message);
    }
});



export const loginUser = createAsyncThunk("auth/login", async (user, thunkAPI) => {
    console.log(user);
});


export const logoutFunc = createAsyncThunk("auth/logout", async () => {
    await authService.logoutUserFromLocalStorage();
});


export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        resetFunc: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = "";
        },
    },
    extraReducers: (builder => {
        builder
            .addCase(registerUser.pending, (state => {
                state.isLoading = true;
            }))
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.user = null;
                state.message = action.payload;
            })
            .addCase(logoutFunc.fulfilled, (state => {
                state.user = null
            }))
    }),
});

export const { resetFunc } = authSlice.actions;
export default authSlice.reducer;