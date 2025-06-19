import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createnews, deletenews, editnews, indexnews, updatenews } from "../../authStore";


const initialState = {
    message: "",
    news: [],
    loading: false,
    error: null,
    success: false,
};

export const CreateNews = createAsyncThunk(
    "create-news",
    async (createData, { rejectWithValue }) => {
        try {
            const response = await createnews(createData);
            console.log(response, "response")
            return response;
        }
        catch (error) {
            const message = error.response?.data?.message || "Create news failed";
            return rejectWithValue(message);
        }
    }
);

export const IndexNews = createAsyncThunk(
    "index-news",
    async (_id, { rejectWithValue }) => {
        try {
            const response = await indexnews(_id);
            console.log(response, "rrrrrrr")
            return response;
        }
        catch (error) {
            const message = error.response?.data?.message || "No data found:";
            return rejectWithValue(message);
        }
    }
);

export const EditNews = createAsyncThunk(
    "edit-news",
    async (newsId, { rejectWithValue }) => {
        try {
            const response = await editnews(newsId);
            return response;
        }
        catch (error) {
            const message = error.response?.data?.message || "No data found:";
            return rejectWithValue(message);
        }
    }
);

export const UpdateNews = createAsyncThunk(
    "update-news",
    async (newsId, { rejectWithValue }) => {
        try {
            const response = await updatenews(newsId);
            return response;
        }
        catch (error) {
            const message = error.response?.data?.message || "Error updating data";
            return rejectWithValue(message);
        }
    }
)

export const DeleteNews = createAsyncThunk(
    "delete-news",
    async (newsId, { rejectWithValue }) => {
        try {
            const response = await deletenews(newsId);
            return response;
        }
        catch (error) {
            const message = error.response?.data?.message || "Error deleting news";
            return rejectWithValue(message);
        }
    }
)

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        clearMessages: (state) => {
            state.error = null;
            state.success = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(CreateNews.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(CreateNews.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload?.message || "News created successfully";
                if (action.payload?.data) {
                    state.news.push(action.payload.data);
                }
            })
            .addCase(CreateNews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(IndexNews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(IndexNews.fulfilled, (state, action) => {
                state.loading = false;
                state.news = action.payload?.data || action.payload || [];
                state.message = action.payload?.message || "News fetched successfully";
            })
            .addCase(IndexNews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.news = [];
            })

            .addCase(EditNews.pending, (state) => {
                state.loading = true;
            })
            .addCase(EditNews.fulfilled, (state, action) => {
                state.loading = false;
                state.news = action.payload.data;
                state.error = null;
            })
            .addCase(EditNews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(UpdateNews.pending, (state) => {
                state.loading = true;
            })
            .addCase(UpdateNews.fulfilled, (state, action) => {
                state.loading = false;
                state.news = action.payload.data;
                state.error = null;
            })
            .addCase(UpdateNews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(DeleteNews.pending, (state) => {
                state.loading = true;
            })
            .addCase(DeleteNews.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
            })
            .addCase(DeleteNews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export const { clearMessages } = newsSlice.actions;
export default newsSlice.reducer;