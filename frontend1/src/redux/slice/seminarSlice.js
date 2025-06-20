import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createseminar, deleteseminar, editseminar, indexseminar, updateseminar } from "../../authStore";


const initialState = {
    message: "",
    seminar: [],
    loading: false,
    error: null,
    success: false,
};

export const CreateSeminar = createAsyncThunk(
    "create-seminar",
    async (createData, { rejectWithValue }) => {
        try {
            const response = await createseminar(createData);
            console.log(response, "response")
            return response;
        }
        catch (error) {
            const message = error.response?.data?.message || "Create seminar failed";
            return rejectWithValue(message);
        }
    }
);

export const IndexSeminar = createAsyncThunk(
    "index-seminar",
    async (_id, { rejectWithValue }) => {
        try {
            const response = await indexseminar(_id);
            // console.log(response, "rrrrrrr")
            return response;
        }
        catch (error) {
            const message = error.response?.data?.message || "No data found:";
            return rejectWithValue(message);
        }
    }
);

export const EditSeminar = createAsyncThunk(
    "edit-seminar",
    async (seminarId, { rejectWithValue }) => {
        try {
            const response = await editseminar(seminarId);
            console.log(response,"hhhh")
            return response;
        }
        catch (error) {
            const message = error.response?.data?.message || "No data found:";
            return rejectWithValue(message);
        }
    }
);

export const UpdateSeminar = createAsyncThunk(
    "update-seminar",
    async ({ seminarId, formData }, { rejectWithValue }) => {
        try {
            const response = await updateseminar(seminarId,formData);
            console.log(response,"response")
            return response;
        }
        catch (error) {
            const message = error.response?.data?.message || "Error updating data";
            return rejectWithValue(message);
        }
    }
)

export const DeleteSeminar = createAsyncThunk(
    "delete-seminar",
    async (seminarId, { rejectWithValue }) => {
        try {
            const response = await deleteseminar(seminarId);
            return response;
        }
        catch (error) {
            const message = error.response?.data?.message || "Error deleting seminar";
            return rejectWithValue(message);
        }
    }
)

const seminarSlice = createSlice({
    name: 'seminar',
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
            .addCase(CreateSeminar.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(CreateSeminar.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload?.message || "News created successfully";
                if (action.payload?.data) {
                    state.seminar.push(action.payload.data);
                }
            })
            .addCase(CreateSeminar.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(IndexSeminar.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(IndexSeminar.fulfilled, (state, action) => {
                state.loading = false;
                state.seminar = action.payload?.data || action.payload || [];
                state.message = action.payload?.message || "News fetched successfully";
            })
            .addCase(IndexSeminar.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.seminar = [];
            })

            .addCase(EditSeminar.pending, (state) => {
                state.loading = true;
            })
            .addCase(EditSeminar.fulfilled, (state, action) => {
                state.loading = false;
                state.seminar = action.payload.data;
                state.error = null;
            })
            .addCase(EditSeminar.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(UpdateSeminar.pending, (state) => {
                state.loading = true;
            })
            .addCase(UpdateSeminar.fulfilled, (state, action) => {
                state.loading = false;
                state.seminar = action.payload.data;
                state.error = null;
            })
            .addCase(UpdateSeminar.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(DeleteSeminar.pending, (state) => {
                state.loading = true;
            })
            .addCase(DeleteSeminar.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
            })
            .addCase(DeleteSeminar.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export const { clearMessages } = seminarSlice.actions;
export default seminarSlice.reducer;