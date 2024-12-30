import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../Config/api";

const initialState = {
    bids: null,
    bid: null,
    isLoading: true,
    error: null,
};


export const createBid = createAsyncThunk(
    "bid/createBid",
    async (data) => {
        const response = await api.post(`/api/bids`, data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return response.data;
    }
);

const bidSlice = createSlice({
    name: "bid",
    initialState,

    extraReducers: (builder) => {
        builder

            .addCase(createBid.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createBid.fulfilled, (state, action) => {
                state.isLoading = false;
                state.bid = action.payload.success ? action.payload.data.bid : null;
            })
            .addCase(createBid.rejected, (state) => {
                state.isLoading = false;
                state.bid = null;
            })

    },
});

export default bidSlice.reducer;
