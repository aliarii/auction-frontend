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
        const response = await api.post(`/api/bids/create`, data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return response.data;
    }
);
export const getBidById = createAsyncThunk(
    "bid/getBidById",
    async (id) => {
        const response = await api.get(`/api/bids/${id}`);
        return response.data;
    }
);
export const getBidsByAuction = createAsyncThunk(
    "bid/getBidsByAuction",
    async (id) => {
        const response = await api.get(`/api/bids/auction/${id}`);
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
            .addCase(getBidById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBidById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.bid = action.payload.success ? action.payload.data.bid : null;
            })
            .addCase(getBidById.rejected, (state) => {
                state.isLoading = false;
                state.bid = null;
            })
            .addCase(getBidsByAuction.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBidsByAuction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.bids = action.payload.success ? action.payload.data.bids : null;
            })
            .addCase(getBidsByAuction.rejected, (state) => {
                state.isLoading = false;
                state.bids = null;
            })
    },
});

export default bidSlice.reducer;
