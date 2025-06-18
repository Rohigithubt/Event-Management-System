import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createlocation, indexlocation, deletelocation, editlocation, updatelocation } from "../../authStore";

const initialState = {
    message: "",
    location: [],
    loading: false,
    error: null,
    success: false,
};

export const CreateLocation = createAsyncThunk(
    "create-location",
    async (LocationName, { rejectWithValue }) => {
        try {
            const response = await createlocation(LocationName);
            return response;
        } catch (error) {
            const message = error.response?.data?.message || error.message || "Failed to create location";
            return rejectWithValue(message);
        }
    });

export const IndexLocation = createAsyncThunk(
    "index-location",
    async (locationId, { rejectWithValue }) => {
        try {
            const response = await indexlocation(locationId);
            return response;
        } catch (error) {
            const message = error.response?.data?.message || error.message || "Failed to fetch locations";
            return rejectWithValue(message);
        }
    });

export const DeleteLocation = createAsyncThunk(
    "delete-location",
    async (locationId, { rejectWithValue }) => {
        try {
            const response = await deletelocation(locationId);
            return response;
        }
        catch (error) {
            const message = error.response?.data?.message || "Error deleting location";
            return rejectWithValue(message);
        }
    }
);

export const EditLocation = createAsyncThunk(
    "edit-location",
    async (locationId, { rejectWithValue }) => {
        try {
            const response = await editlocation(locationId);
            return response;
        }
        catch (error) {
            const message = error.response?.data?.message || "Error fetching data";
            return rejectWithValue(message);
        }

    }
)

export const UpdateLocation = createAsyncThunk(
    "update-location",
    async (locationId, { rejectWithValue }) => {
        try {
            const response = await updatelocation(locationId);
            console.log(response, "response")
            return response;
        }
        catch (error) {
            const message = error.response?.data?.message || "Error updating data";
            return rejectWithValue(message);
        }
    }
)

const locationSlice = createSlice({
    name: 'location',
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
            .addCase(CreateLocation.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(CreateLocation.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload?.message || "Location created successfully";
                if (action.payload?.data) {
                    state.location.push(action.payload.data);
                }
            })
            .addCase(CreateLocation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(IndexLocation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(IndexLocation.fulfilled, (state, action) => {
                state.loading = false;
                state.location = action.payload?.data || action.payload || [];
                state.message = action.payload?.message || "Locations fetched successfully";
            })
            .addCase(IndexLocation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.location = [];
            })

            .addCase(DeleteLocation.pending, (state) => {
                state.loading = true;
            })
            .addCase(DeleteLocation.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
            })
            .addCase(DeleteLocation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(EditLocation.pending, (state) => {
                state.loading = true;
            })
            .addCase(EditLocation.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data;
                state.error = null;
            })
            .addCase(EditLocation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(UpdateLocation.pending, (state) => {
                state.loading = true;
            })
            .addCase(UpdateLocation.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data;
                state.error = null;
            })
            .addCase(UpdateLocation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export const { clearMessages } = locationSlice.actions;
export default locationSlice.reducer;