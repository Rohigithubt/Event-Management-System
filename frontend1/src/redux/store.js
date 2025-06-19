import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../redux/slice/userSlice";
import locationSlice from "../redux/slice/locationSlice";
import newsSlice from "../redux/slice/newsSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    location: locationSlice,
    news:newsSlice,
  }
});

export default store;