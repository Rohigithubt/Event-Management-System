import { configureStore } from "@reduxjs/toolkit";
import useReducer  from "../redux/user/userSlice"

const store = configureStore({
    reducer:{
        user:useReducer,
    }
})
export default store;