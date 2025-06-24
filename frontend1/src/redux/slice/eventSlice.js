import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createEvent, deleteEvent, indexEvent } from "../../authStore";

const initialState = {
  message: "",
  event: [],
  loading: false,
  error: null,
  success: false,
};

export const CreateEvent = createAsyncThunk(
  "create-event",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await createEvent(formData);
      console.log(object)
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create Event"
      );
    }
  }
);

export const IndexEvent = createAsyncThunk(
   "index-event",
   async (_id,{rejectWithValue}) =>{
    try{
      const response = await indexEvent(_id);
      console.log(response,"slice response")
      return response;    
    }
    catch(error){
        return rejectWithValue(
            error.response?.data?.message || "No data found:"
        );
    }
   }
);

export const DeleteEvent = createAsyncThunk(
    "delete-event",
    async (eventId, {rejectWithValue}) =>{
        try{
            const response = await deleteEvent(eventId);
            return response;
        }
        catch(error){
         return rejectWithValue(
            error.response?.data?.message || "Failed to delete event:"
         );
        }
    }
)

const eventSlice = createSlice({
  name: "event",
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
      .addCase(CreateEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CreateEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload?.message;
        state.event.unshift(action.payload?.data);
      })
      .addCase(CreateEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(IndexEvent.pending, (state) => {
              state.loading = true;
              state.error = null;
            })
            .addCase(IndexEvent.fulfilled, (state, action) => {
              state.loading = false;
              state.event = action.payload?.data || [];
            })
            .addCase(IndexEvent.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload;
            })

            .addCase(DeleteEvent.pending, (state) => {
                    state.loading = true;
                  })
                  .addCase(DeleteEvent.fulfilled, (state, action) => {
                    state.loading = false;
                    state.success = true;
                    state.message = action.payload?.message;
                    state.event = state.event.filter(
                      event => event._id !== action.meta.arg
                    );
                  })
                  .addCase(DeleteEvent.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                  })
  },
});

export const { clearMessages } = eventSlice.actions;
export default eventSlice.reducer;
