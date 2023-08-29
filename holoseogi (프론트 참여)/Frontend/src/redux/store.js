import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/userSlice";
import persistedReducer from "./combineReducer";
import rootReducer from "./combineReducer";

export default configureStore({
  reducer: {
    persistedReducer,
  },
});
