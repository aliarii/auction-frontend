import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api";

const initialState = {
    users: null,
    user: null,
    userProfile: null,
    isLoading: false,
    error: null,
};


export const updateUser = createAsyncThunk(
    "user/updateUser",
    async (data) => {
        const response = await api.patch(`/api/users/update/${data._id}`, data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return response.data;
    }
);

export const deleteUser = createAsyncThunk(
    "user/deleteUser",
    async (id) => {
        const response = await api.delete(`/api/users/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return response.data;
    }
);
export const joinAuction = createAsyncThunk(
    "auction/joinAuction",
    async (data) => {
        const response = await api.post(`/api/auctions/join`, data, {
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

        const response = await api.get(`/api/users/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return response.data;
    }
);

export const getUserByToken = createAsyncThunk(
    "user/token",
    async (token) => {

        const response = await api.get(`/api/users/token`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }
);

export const getUserProfile = createAsyncThunk(
    "user/profile",
    async (token) => {

        const response = await api.get(`/api/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }
);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
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
            .addCase(joinAuction.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(joinAuction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.success ? action.payload.data.user : null;
            })
            .addCase(joinAuction.rejected, (state) => {
                state.isLoading = false;
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
            .addCase(getUserByToken.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserByToken.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.success ? action.payload.data.user : null;
            })
            .addCase(getUserByToken.rejected, (state) => {
                state.isLoading = false;
                state.user = null;
            })
            .addCase(getUserProfile.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userProfile = action.payload.success ? action.payload.data.user : null;
            })
            .addCase(getUserProfile.rejected, (state) => {
                state.isLoading = false;
                state.userProfile = null;
            })

    },
});

export default userSlice.reducer;
