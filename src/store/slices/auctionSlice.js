import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../Config/api";

const initialState = {
    auctions: null,
    auction: null,
    isLoading: true,
    error: null,
};
export const createAuction = createAsyncThunk(
    "auction/createAuction",
    async (data) => {
        const response = await api.post("/api/auctions/create", data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return response.data;
    }
);

export const updateAuction = createAsyncThunk(
    "auction/updateAuction",
    async (data) => {
        const response = await api.patch(`/api/auctions/update/${data.id}`, data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return response.data;
    }
);

export const deleteAuction = createAsyncThunk(
    "auction/deleteAuction",
    async (data) => {
        const response = await api.delete(`/api/auctions/delete/${data.id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return response.data;
    }
);

export const getAuctions = createAsyncThunk(
    "auction/auctions",
    async () => {
        const response = await api.get("/api/auctions");
        return response.data;
    }
);

export const getAuctionById = createAsyncThunk(
    "auction/auction",
    async (id) => {
        const response = await api.get(`/api/auctions/${id}`);
        return response.data;
    }
);

export const getAuctionsByCategory = createAsyncThunk(
    "auction/auctionsByCategory",
    async (categoryId) => {
        const response = await api.get(`/api/auctions/category/${categoryId}`);
        return response.data;
    }
);

// export const getAuctionsByStatus = createAsyncThunk(
//     "auction/auctionsByStatus",
//     async (status) => {
//         console.log(status);

//         const response = await api.get(`/api/auctions/status/${status}`);
//         return response.data;
//     }
// );
export const getAuctionsByStatus = createAsyncThunk(
    "auction/auctionsByStatus",
    async (statuses) => {

        const response = await api.get(`/api/auctions/status?status=${statuses}`);


        return response.data;
    }
);

const auctionSlice = createSlice({
    name: "auction",
    initialState,

    extraReducers: (builder) => {
        builder
            .addCase(createAuction.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createAuction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.auction = action.payload.success ? action.payload.data.auction : null;
            })
            .addCase(createAuction.rejected, (state) => {
                state.isLoading = false;
                state.auction = null;
            })
            .addCase(updateAuction.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateAuction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.auction = action.payload.success ? action.payload.data.updatedAuction : null;
            })
            .addCase(updateAuction.rejected, (state) => {
                state.isLoading = false;
                state.auction = null;
            })
            .addCase(deleteAuction.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteAuction.fulfilled, (state) => {
                state.isLoading = false;
                state.auction = null;
            })
            .addCase(deleteAuction.rejected, (state) => {
                state.isLoading = false;
                state.auction = null;
            })
            .addCase(getAuctions.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAuctions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.auctions = action.payload.success ? action.payload.data.auctions : null;
            })
            .addCase(getAuctions.rejected, (state) => {
                state.isLoading = false;
                state.auctions = null;
            })
            .addCase(getAuctionById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAuctionById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.auction = action.payload.success ? action.payload.data.auction : null;
            })
            .addCase(getAuctionById.rejected, (state) => {
                state.isLoading = false;
                state.auction = null;
            })
            .addCase(getAuctionsByCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAuctionsByCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.auctions = action.payload.success ? action.payload.data.auctions : null;
            })
            .addCase(getAuctionsByCategory.rejected, (state) => {
                state.isLoading = false;
                state.auctions = null;
            })
            .addCase(getAuctionsByStatus.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAuctionsByStatus.fulfilled, (state, action) => {
                state.isLoading = false;
                state.auctions = action.payload.success ? action.payload.data.auctions : null;
            })
            .addCase(getAuctionsByStatus.rejected, (state) => {
                state.isLoading = false;
                state.auctions = null;
            });
    },
});

export default auctionSlice.reducer;
