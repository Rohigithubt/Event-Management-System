import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createwebinar, deletewebinar, editwebinar, indexwebinar, updatewebinar } from "../../authStore";


const initialState = {
    message: "",
    webinar: [],
    loading: false,
    error: null,
    success: false,
};

export const Createwebinar = createAsyncThunk(
    "create-webinar",
    async (createData, { rejectWithValue }) => {
        try {
            const response = await createwebinar(createData);
            console.log(response, "response")
            return response;
        }
        catch (error) {
            const message = error.response?.data?.message || "Create news failed";
            return rejectWithValue(message);
        }
    }
);

export const IndexWebinar = createAsyncThunk(
    "index-webinar",
    async (_id, { rejectWithValue }) => {
        try {
            const response = await indexwebinar(_id);
            // console.log(response, "rrrrrrr")
            return response;
        }
        catch (error) {
            const message = error.response?.data?.message || "No data found:";
            return rejectWithValue(message);
        }
    }
);

export const EditWebinar = createAsyncThunk(
    "edit-webinar",
    async (webinarId, { rejectWithValue }) => {
        try {
            const response = await editwebinar(webinarId);
            console.log(response,"hhhh")
            return response;
        }
        catch (error) {
            const message = error.response?.data?.message || "No data found:";
            return rejectWithValue(message);
        }
    }
);

export const UpdateWebinar = createAsyncThunk(
    "update-webinar",
    async ({ webinarId, formData }, { rejectWithValue }) => {
        try {
            const response = await updatewebinar(webinarId,formData);
            console.log(response,"response")
            return response;
        }
        catch (error) {
            const message = error.response?.data?.message || "Error updating data";
            return rejectWithValue(message);
        }
    }
)

export const DeleteWebinar = createAsyncThunk(
    "delete-webinar",
    async (webinarId, { rejectWithValue }) => {
        try {
            const response = await deletewebinar(webinarId);
            return response;
        }
        catch (error) {
            const message = error.response?.data?.message || "Error deleting news";
            return rejectWithValue(message);
        }
    }
)

const webinarSlice = createSlice({
    name: 'webinar',
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
            .addCase(Createwebinar.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(Createwebinar.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload?.message || "Webinar created successfully";
                if (action.payload?.data) {
                    state.webinar.push(action.payload.data);
                }
            })
            .addCase(Createwebinar.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(IndexWebinar.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(IndexWebinar.fulfilled, (state, action) => {
                state.loading = false;
                state.webinar = action.payload?.data || action.payload || [];
                state.message = action.payload?.message || "Webinar fetched successfully";
            })
            .addCase(IndexWebinar.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.webinar = [];
            })

            .addCase(EditWebinar.pending, (state) => {
                state.loading = true;
            })
            .addCase(EditWebinar.fulfilled, (state, action) => {
                state.loading = false;
                state.webinar = action.payload.data;
                state.error = null;
            })
            .addCase(EditWebinar.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(UpdateWebinar.pending, (state) => {
                state.loading = true;
            })
            .addCase(UpdateWebinar.fulfilled, (state, action) => {
                state.loading = false;
                state.webinar = action.payload.data;
                state.error = null;
            })
            .addCase(UpdateWebinar.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(DeleteWebinar.pending, (state) => {
                state.loading = true;
            })
            .addCase(DeleteWebinar.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
            })
            .addCase(DeleteWebinar.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export const { clearMessages } = webinarSlice.actions;
export default webinarSlice.reducer;