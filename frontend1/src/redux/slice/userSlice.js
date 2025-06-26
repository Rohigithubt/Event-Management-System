import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { register, login, index, editprofile, updateprofile, destroy } from "../../authStore";

const initialState = {
  message: "",
  user: [],
  loading: false,
  error: null,
  success: null,
  token: null,
  profile: null,
  _id: ""
};

export const Index = createAsyncThunk("index", async (userId, { rejectWithValue }) => {
  try {
    const response = await index(userId);
    return response;
  } catch (error) {
    const message = error.response?.data?.message || "No user found";
    return rejectWithValue(message);
  }
});

export const RegisterUser = createAsyncThunk("register", async (registerData, { rejectWithValue }) => {
  try {
    const response = await register(registerData);
    return response;
  } catch (error) {
    const message = error.response?.data?.message || "SignUp Failed";
    return rejectWithValue(message);
  }
});

export const LoginUser = createAsyncThunk("login", async (loginData, { rejectWithValue }) => {
  try {
    const response = await login(loginData);
    console.log(response,"respo")
    localStorage.setItem("_id", response.user._id);

    return response;
  } catch (error) {
    const message = error.response?.data?.message || "Login failed";
    return rejectWithValue(message);
  }
});

export const EditUserProfile = createAsyncThunk("editprofile",async (userId, {rejectWithValue}) =>{
    try{
      const response = await editprofile({userId});
      return response;
    }
    catch(error){
      const message = error.response?.data?.message || "Editprofile Failed";
      return rejectWithValue(message);
    }
});

export const UpdateUserProfile = createAsyncThunk(
  "updateprofile",
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await updateprofile(profileData);
       console.log(response,"profileData")
      return response;
    } catch (error) {
      const message = error.response?.data?.message || "Update Profile Failed";
      return rejectWithValue(message);
    }
  }
);

export const DestroyUserData = createAsyncThunk(
  "destroy",
  async (userId,{rejectWithValue}) =>{
    try{
      const response = await destroy(userId);
      return response;
    }
    catch(error){
    const message = error.response?.data?.message || "Error deleteing user";
      return rejectWithValue(message);
  }
  });
  
  export const LogOut = createAsyncThunk(
  "logout",
  async (_, { rejectWithValue }) => {  
    try {
      const response = await logout();
      console.log(response,"reeeee")
      localStorage.removeItem('token');
      localStorage.removeItem('_id');
      return response;
    } catch (error) {
      const message = error.response?.data?.message || "Logout Error";
      return rejectWithValue(message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.success = null;
      state.message = "";
    },
        // logout: (state) => {
        //   state.user = [];
        //   state.token = null;
        //   localStorage.removeItem("token");
        // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(RegisterUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(RegisterUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload;
        state.message = action.payload.message;
      })
      .addCase(RegisterUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(LoginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload;
        state.message = action.payload.message;
        state.name = action.payload.name;
        state.token = action.payload.token;
        state._id = action.payload.userId;
        localStorage.setItem("token", action.payload.token);

      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

    .addCase(Index.pending, (state) => {
      state.loading = true;
    })
    .addCase(Index.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.data;
      state.error = null;
    })
    .addCase(Index.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    .addCase(EditUserProfile.pending,(state)=>{
      state.loading = true;
    })
     .addCase(EditUserProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.data;
      state.error = null;
    })
    .addCase(EditUserProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

     .addCase(UpdateUserProfile.pending,(state)=>{
      state.loading = true;
    })
     .addCase(UpdateUserProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.data;
      state.error = null;
    })
    .addCase(UpdateUserProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    .addCase(DestroyUserData.pending, (state) => {
  state.loading = true;
})
.addCase(DestroyUserData.fulfilled, (state, action) => {
  state.loading = false;
  state.success = true;
  state.message = action.payload.message;
})
.addCase(DestroyUserData.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
})

 .addCase(LogOut.pending, (state) => {
  state.loading = true;
})
.addCase(LogOut.fulfilled, (state, action) => {
  state.loading = false;
  state.success = true;
  state.message = action.payload.message;
})
.addCase(LogOut.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
})


  },
});

export const { clearMessages, logout } = userSlice.actions;
export default userSlice.reducer;
