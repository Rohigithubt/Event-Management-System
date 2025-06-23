import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { 
  createwebinar, 
  deletewebinar, 
  editwebinar, 
  indexwebinar, 
  updatewebinar 
} from "../../authStore";

const initialState = {
  webinars: [],
  loading: false,
  error: null,
  success: false,
  message: ""
};

export const CreateWebinar = createAsyncThunk(
  "create-webinar",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await createwebinar(formData);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create webinar"
      );
    }
  }
);

export const IndexWebinar = createAsyncThunk(
  "index-webinar",
  async (_, { rejectWithValue }) => {
    try {
      const response = await indexwebinar();
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch webinars"
      );
    }
  }
);

export const EditWebinar = createAsyncThunk(
  "edit-webinar",
  async (webinarId, { rejectWithValue }) => {
    try {
      const response = await editwebinar(webinarId);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch webinar"
      );
    }
  }
);

export const UpdateWebinar = createAsyncThunk(
  "update-webinar",
  async (formData, { rejectWithValue }) => {  
    try {
      const response = await updatewebinar(formData);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update webinar"
      );
    }
  }
);

export const DeleteWebinar = createAsyncThunk(
  "delete-webinar",
  async (webinarId, { rejectWithValue }) => {
    try {
      const response = await deletewebinar(webinarId);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete webinar"
      );
    }
  }
);

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
     
      .addCase(CreateWebinar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CreateWebinar.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload?.message;
        state.webinars.unshift(action.payload?.data);
      })
      .addCase(CreateWebinar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      

      .addCase(IndexWebinar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(IndexWebinar.fulfilled, (state, action) => {
        state.loading = false;
        state.webinars = action.payload?.data || [];
      })
      .addCase(IndexWebinar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
     
      .addCase(EditWebinar.pending, (state) => {
        state.loading = true;
      })
      .addCase(EditWebinar.fulfilled, (state, action) => {
        state.loading = false;
    
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
        state.success = true;
        state.message = action.payload?.message;
        state.webinars = state.webinars.map(webinar => 
          webinar._id === action.payload?.data?._id ? action.payload.data : webinar
        );
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
        state.message = action.payload?.message;
        state.webinars = state.webinars.filter(
          webinar => webinar._id !== action.meta.arg
        );
      })
      .addCase(DeleteWebinar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearMessages } = webinarSlice.actions;
export default webinarSlice.reducer;