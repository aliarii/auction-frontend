import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../Config/api";

const initialState = {
    users: null,
    user: null,
    isLoading: true,
    error: null,
};


export const updateUser = createAsyncThunk(
    "user/updateUser",
    async (data) => {
        const response = await api.patch(`/api/users/update/${data.id}`, data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return response.data;
    }
);

export const deleteUser = createAsyncThunk(
    "user/deleteUser",
    async (data) => {
        const response = await api.delete(`/api/users/delete/${data.id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return response.data;
    }
);

export const getUsers = createAsyncThunk(
    "user/users",
    async () => {
        const response = await api.get("/api/users", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return response.data;
    }
);

export const getUserById = createAsyncThunk(
    "user/user",
    async (id) => {
        const response = await api.get(`/api/users/${id}`);
        return response.data;
    }
);


const userSlice = createSlice({
    name: "user",
    initialState,

    extraReducers: (builder) => {
        builder

            .addCase(updateUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.success ? action.payload.data.user : null;
            })
            .addCase(updateUser.rejected, (state) => {
                state.isLoading = false;
                state.user = null;
            })
            .addCase(deleteUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteUser.fulfilled, (state) => {
                state.isLoading = false;
                state.user = null;
            })
            .addCase(deleteUser.rejected, (state) => {
                state.isLoading = false;
                state.user = null;
            })
            .addCase(getUsers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload.success ? action.payload.data.users : null;
            })
            .addCase(getUsers.rejected, (state) => {
                state.isLoading = false;
                state.users = null;
            })
            .addCase(getUserById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.success ? action.payload.data.user : null;
            })
            .addCase(getUserById.rejected, (state) => {
                state.isLoading = false;
                state.user = null;
            })

    },
});

export default userSlice.reducer;
