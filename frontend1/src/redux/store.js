import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../redux/slice/userSlice";
import locationSlice from "../redux/slice/locationSlice";
import newsSlice from "../redux/slice/newsSlice";
import seminarSlice from "../redux/slice/seminarSlice"
import webinarSlice from "../redux/slice/webinarSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    location: locationSlice,
    news:newsSlice,
    seminar:seminarSlice,
    webinar:webinarSlice,
  }
});

export default store;