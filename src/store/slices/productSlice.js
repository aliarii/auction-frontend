import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../Config/api";

const initialState = {
    products: null,
    product: null,
    isLoading: true,
    error: null,
};
export const createProduct = createAsyncThunk(
    "product/createProduct",
    async (data) => {

        const response = await api.post("/api/products/create", data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        return response.data;
    }
);

export const updateProduct = createAsyncThunk(
    "product/updateProduct",
    async (data) => {
        const response = await api.patch(`/api/products/update/${data.id}`, data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return response.data;
    }
);

export const deleteProduct = createAsyncThunk(
    "product/deleteProduct",
    async (data) => {

        const response = await api.delete(`/api/products/delete/${data.id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        return response.data;
    }
);

export const getProducts = createAsyncThunk(
    "product/products",
    async () => {
        const response = await api.get("/api/products");
        return response.data;
    }
);

export const getProductById = createAsyncThunk(
    "product/product",
    async (id) => {
        const response = await api.get(`/api/products/${id}`);
        return response.data;
    }
);

export const getProductsByCategory = createAsyncThunk(
    "product/productsByCategory",
    async (categoryId) => {
        const response = await api.get(`/api/products/category/${categoryId}`);
        return response.data;
    }
);

const productSlice = createSlice({
    name: "product",
    initialState,

    extraReducers: (builder) => {
        builder
            .addCase(createProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.product = action.payload.success ? action.payload.data.product : null;
            })
            .addCase(createProduct.rejected, (state) => {
                state.isLoading = false;
                state.product = null;
            })
            .addCase(updateProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.product = action.payload.success ? action.payload.data.product : null;
            })
            .addCase(updateProduct.rejected, (state) => {
                state.isLoading = false;
                state.product = null;
            })
            .addCase(deleteProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteProduct.fulfilled, (state) => {
                state.isLoading = false;
                state.product = null;
            })
            .addCase(deleteProduct.rejected, (state) => {
                state.isLoading = false;
                state.product = null;
            })
            .addCase(getProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload.success ? action.payload.data.products : null;
            })
            .addCase(getProducts.rejected, (state) => {
                state.isLoading = false;
                state.products = null;
            })
            .addCase(getProductById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.product = action.payload.success ? action.payload.data.product : null;
            })
            .addCase(getProductById.rejected, (state) => {
                state.isLoading = false;
                state.product = null;
            })
            .addCase(getProductsByCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProductsByCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload.success ? action.payload.data.products : null;
            })
            .addCase(getProductsByCategory.rejected, (state) => {
                state.isLoading = false;
                state.products = null;
            })
    },
});

export default productSlice.reducer;
