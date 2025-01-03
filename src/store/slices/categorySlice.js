import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../Config/api";

const initialState = {
    productCategories: null,
    productCategory: null,
    auctionCategories: null,
    auctionCategory: null,
    isLoading: false,
    error: null,
};
export const createAuctionCategory = createAsyncThunk(
    "auction-categories/createAuctionCategory",
    async (data) => {
        const response = await api.post("/api/auction-categories/create", data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return response.data;
    }
);

export const updateAuctionCategory = createAsyncThunk(
    "auction-categories/updateAuctionCategory",
    async (data) => {
        const response = await api.patch(`/api/auction-categories/update/${data.id}`, data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return response.data;
    }
);

export const deleteAuctionCategory = createAsyncThunk(
    "auction-categories/deleteAuctionCategory",
    async (data) => {
        const response = await api.delete(`/api/auction-categories/delete/${data.id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return response.data;
    }
);

export const getAuctionCategories = createAsyncThunk(
    "auction-categories/getAuctionCategories",
    async () => {

        const response = await api.get("/api/auction-categories");
        // console.log("response", response);
        return response.data;
    }
);

export const getAuctionCategoryById = createAsyncThunk(
    "auction-categories/getAuctionCategoryById",
    async (id) => {
        const response = await api.get(`/api/auction-categories/${id}`);
        return response.data;
    }
);

export const createProductCategory = createAsyncThunk(
    "product-categories/createProductCategory",
    async (data) => {
        const response = await api.post("/api/product-categories/create", data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return response.data;
    }
);

export const updateProductCategory = createAsyncThunk(
    "product-categories/updateProductCategory",
    async (data) => {
        const response = await api.patch(`/api/product-categories/update/${data.id}`, data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return response.data;
    }
);

export const deleteProductCategory = createAsyncThunk(
    "product-categories/deleteProductCategory",
    async (data) => {
        const response = await api.delete(`/api/product-categories/delete/${data.id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return response.data;
    }
);

export const getProductCategories = createAsyncThunk(
    "product-categories/getProductCategories",
    async () => {
        const response = await api.get("/api/product-categories");
        return response.data;
    }
);

export const getProductCategoryById = createAsyncThunk(
    "product-categories/getProductCategoryById",
    async (id) => {
        const response = await api.get(`/api/product-categories/${id}`);
        return response.data;
    }
);

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // auction category
            .addCase(createAuctionCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createAuctionCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.auctionCategory = action.payload.success ? action.payload.data.category : null;
            })
            .addCase(createAuctionCategory.rejected, (state) => {
                state.isLoading = false;
                state.auctionCategory = null;
            })
            .addCase(updateAuctionCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateAuctionCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.auctionCategory = action.payload.success ? action.payload.data.updatedCategory : null;
            })
            .addCase(updateAuctionCategory.rejected, (state) => {
                state.isLoading = false;
                state.auctionCategory = null;
            })
            .addCase(deleteAuctionCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteAuctionCategory.fulfilled, (state) => {
                state.isLoading = false;
                state.auctionCategory = null;
            })
            .addCase(deleteAuctionCategory.rejected, (state) => {
                state.isLoading = false;
                state.auctionCategory = null;
            })
            .addCase(getAuctionCategories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAuctionCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.auctionCategories = action.payload.success ? action.payload.data.categories : null;
            })
            .addCase(getAuctionCategories.rejected, (state) => {
                state.isLoading = false;
                state.auctionCategories = null;
            })
            .addCase(getAuctionCategoryById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAuctionCategoryById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.auctionCategory = action.payload.success ? action.payload.data.category : null;
            })
            .addCase(getAuctionCategoryById.rejected, (state) => {
                state.isLoading = false;
                state.auctionCategory = null;
            })
            // product category
            .addCase(createProductCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createProductCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productCategory = action.payload.success ? action.payload.data.category : null;
            })
            .addCase(createProductCategory.rejected, (state) => {
                state.isLoading = false;
                state.productCategory = null;
            })
            .addCase(updateProductCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateProductCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productCategory = action.payload.success ? action.payload.data.updatedCategory : null;
            })
            .addCase(updateProductCategory.rejected, (state) => {
                state.isLoading = false;
                state.productCategory = null;
            })
            .addCase(deleteProductCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteProductCategory.fulfilled, (state) => {
                state.isLoading = false;
                state.productCategory = null;
            })
            .addCase(deleteProductCategory.rejected, (state) => {
                state.isLoading = false;
                state.productCategory = null;
            })
            .addCase(getProductCategories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProductCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productCategories = action.payload.success ? action.payload.data.categories : null;
            })
            .addCase(getProductCategories.rejected, (state) => {
                state.isLoading = false;
                state.productCategories = null;
            })
            .addCase(getProductCategoryById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProductCategoryById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productCategory = action.payload.success ? action.payload.data.category : null;
            })
            .addCase(getProductCategoryById.rejected, (state) => {
                state.isLoading = false;
                state.productCategory = null;
            })
    },
});

export default categorySlice.reducer;
