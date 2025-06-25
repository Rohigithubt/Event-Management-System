import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteNotification, indexNotification } from "../../authStore";
const initialState = {
    message: "",
    usernotification: [],
    loading: false,
    error: null,
    success: null,
};

export const IndexUserNotification = createAsyncThunk("index-usernotification", async (usernotificationId, { rejectWithValue }) => {
    try {
        const response = await indexNotification();
        return response;
    }
    catch (error) {
        return rejectWithValue(
            error.response?.data?.message || "Failed to fetch notification"
        );
    }

});

export const DeleteUserNotification = createAsyncThunk("delete-usernotification",async(usernotificationId,{rejectWithValue}) =>{
    try{
        const response = await deleteNotification(usernotificationId);
        return response;
    }
    catch(error){
        return rejectWithValue(
            error.response?.data?.message || "Failed to delete notification"
        );
    }
});

const usernotificationSlice = createSlice({
    name: 'usernotification',
    initialState,
    reducers: {
        clearMessages: (state) => {
            state.error = null;
            state.success = false;
            state.message = "";
        },
    },
    extraReducers: (builder) =>{
        builder 
         .addCase(IndexUserNotification.pending, (state) => {
                state.loading = true;
                state.error = null;
              })
              .addCase(IndexUserNotification.fulfilled, (state, action) => {
                state.loading = false;
                state.usernotification = action.payload?.data || [];
              })
              .addCase(IndexUserNotification.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
              })

              .addCase(DeleteUserNotification.pending, (state) => {
                      state.loading = true;
                    })
                    .addCase(DeleteUserNotification.fulfilled, (state, action) => {
                      state.loading = false;
                      state.success = true;
                      state.message = action.payload?.message;
                      state.usernotification = state.usernotification.filter(
                        usernotification => usernotification.usernotificationId !== action.meta.arg
                      );
                    })
                    .addCase(DeleteUserNotification.rejected, (state, action) => {
                      state.loading = false;
                      state.error = action.payload;
                    });
    }
});

export const {clearMessages} = usernotificationSlice.actions;
export default usernotificationSlice.reducer;