import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../Config/api";


const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
};

export const registerUser = createAsyncThunk(
    "/auth/register",

    async (data) => {
        try {
            const response = await api.post(
                "/api/auth/register",
                data,
                {
                    withCredentials: true,
                }
            );
            return response.data;

        } catch (error) {
            return error.response.data;
        }

    }
);

export const loginUser = createAsyncThunk(
    "/auth/login",

    async (data) => {
        try {

            const response = await api.post(
                "/api/auth/login",
                data,
                {
                    withCredentials: true,
                }
            );

            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
);

export const logoutUser = createAsyncThunk(
    "/auth/logout",

    async () => {
        console.log("logOut 3");

        const response = await api.post(
            "/api/auth/logout",
            {
                withCredentials: true,
            }
        );

        return response.data;
    }
);

export const validateToken = createAsyncThunk(
    "/auth/validateToken",

    async (jwt) => {

        const response = await api.get(
            "/api/auth/validate-token",
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }
        );

        return response.data;
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.isLoading = false;
                state.isAuthenticated = false;
            })
            .addCase(registerUser.rejected, (state) => {
                state.isLoading = false;
                state.isAuthenticated = false;
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = action.payload.success;
                state.token = action.payload.success ? action.payload.data.token : null;
                state.user = action.payload.success ? action.payload.data.user : null;
            })
            .addCase(loginUser.rejected, (state) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.token = null;
                state.user = null;
            })
            .addCase(validateToken.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(validateToken.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = action.payload.success;
                state.user = action.payload.success ? action.payload.data.user : null;
                state.token = action.payload.success ? action.payload.data.token : null;
            })
            .addCase(validateToken.rejected, (state) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.token = null;
                state.user = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.token = null;
                state.user = null;
            })
    },
});

export default authSlice.reducer;