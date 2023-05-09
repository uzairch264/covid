import { configureStore } from "@reduxjs/toolkit";
import covidReducer from "./covidSlice";

const store = configureStore({
  reducer: {
    covid: covidReducer,
  },
});

export default store;