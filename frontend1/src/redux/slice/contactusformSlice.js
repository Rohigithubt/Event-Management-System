import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createcontactusform, deletecontactusform, indexcontactusform } from "../../authStore";

const initialState = {
  message: "",
  contactusform: [],
  loading: false,
  error: null,
  success: false,
};

export const CreateContactUsForm = createAsyncThunk(
  "create-contactusform",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await createcontactusform(formData);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create Contact form"
      );
    }
  }
);

export const IndexContactUsForm = createAsyncThunk(
   "index-contactusform",
   async (_,{rejectWithValue}) =>{
    try{
      const response = await indexcontactusform();
      return response;    
    }
    catch(error){
        return rejectWithValue(
            error.response?.data?.message || "No data found:"
        );
    }
   }
);

export const DeleteContactUsForm = createAsyncThunk(
    "delete-contactusform",
    async (contactusformId, {rejectWithValue}) =>{
        try{
            const response = await deletecontactusform(contactusformId);
            return response;
        }
        catch(error){
         return rejectWithValue(
            error.response?.data?.message || "Failed to delete contacts:"
         );
        }
    }
)

const contactusformSlice = createSlice({
  name: "contactusform",
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
      .addCase(CreateContactUsForm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CreateContactUsForm.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload?.message;
        state.contactusform.unshift(action.payload?.data);
      })
      .addCase(CreateContactUsForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(IndexContactUsForm.pending, (state) => {
              state.loading = true;
              state.error = null;
            })
            .addCase(IndexContactUsForm.fulfilled, (state, action) => {
              state.loading = false;
              state.contactusform = action.payload?.data || [];
            })
            .addCase(IndexContactUsForm.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload;
            })

            .addCase(DeleteContactUsForm.pending, (state) => {
                    state.loading = true;
                  })
                  .addCase(DeleteContactUsForm.fulfilled, (state, action) => {
                    state.loading = false;
                    state.success = true;
                    state.message = action.payload?.message;
                    state.contactusform = state.contactusform.filter(
                      contactusform => contactusform._id !== action.meta.arg
                    );
                  })
                  .addCase(DeleteContactUsForm.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                  })
  },
});

export const { clearMessages } = contactusformSlice.actions;
export default contactusformSlice.reducer;
