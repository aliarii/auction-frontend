import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api";

const initialState = {
    bids: null,
    bid: null,
    isLoading: false,
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
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(createBid.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createBid.fulfilled, (state, action) => {
                state.isLoading = false;
                state.bid = action.payload.success ? action.payload.data.bid : null;
                state.error = action.payload.success ? null : action.payload.error;
            })
            .addCase(createBid.rejected, (state, action) => {
                state.isLoading = false;
                // state.bid = null;
                state.error = action.error;
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
