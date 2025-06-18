import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../redux/slice/userSlice";
import locationSlice from "../redux/slice/locationSlice";


const store = configureStore({
  reducer: {
    user: userSlice,
    location: locationSlice,
  }
});

export default store;