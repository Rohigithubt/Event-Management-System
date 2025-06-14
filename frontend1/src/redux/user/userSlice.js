import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { register } from "../../authStore";
import {login} from "../../authStore"

const initialState = {
    message: "",
    user:[],
    loading:false,
    error:null,
    success:null,
    token:null,
    profile:null,  
}

export const RegisterUser = createAsyncThunk('register',async(registerData,{rejectWithValue}) =>{
    try{
        const response = await register(registerData);
        return response;
    }
    catch(error){
        const message = error.response?.data?.message || "SignUp Failed";
        return rejectWithValue(message);
    }
});

export const LoginUser = createAsyncThunk('login', async (loginData,{ rejectWithValue }) => {
      try {
    const response = await login(loginData);
       return response;    
  } catch (error) {
    const message = error.response?.data?.message || "Login failed";
      return rejectWithValue(message);
  }
});

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        clearMessages: (state) =>{
            state.error =null;
            state.success = null;
            state.message = "";
            return state;
        },
    },

    extraReducers:(builder)=>{
        builder.addCase(RegisterUser.pending,(state)=>{
            state.loading = true;
            state.error = null;
            state.success = null;
        })
        builder.addCase(RegisterUser.fulfilled,(state,action) =>{
            state.loading = false;
            state.success = true;
            state.user = action.payload;
            state.message = action.payload.message;

        })
        builder.addCase(RegisterUser.rejected,(state,action)=>{
            state.loading = true
            state.error = action.payload;
        })

                builder.addCase(LoginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;

        })
        builder.addCase(LoginUser.fulfilled, (state, action) => {            
            state.loading = false;
            state.success = true;
            state.user = action.payload;
            state.message = action.payload.message;
            state.name = action.payload.name;
            state.token = action.payload.token;
            localStorage.setItem('token', action.payload.token);
        })
        builder.addCase(LoginUser.rejected, (state, action) => {
            state.loading = true
            state.error = action.payload;

        })
    }
})

export const {clearMessages} = userSlice.actions;
export default userSlice.reducer;