import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    token: "123",
    user_id: "1",
    user_name: "박준형",
    user_mileage: 31000,
    user_address: "인천 연수구",
  },
  reducers: {
    updateMileage: (state, action) => {
      state.user_mileage = action.payload.user_mileage;
    },
    login: (state, action) => {
      state.token = action.payload.token;
      state.user_id = action.payload.user_id;
      state.user_name = action.payload.user_name;
      state.user_mileage = action.payload.user_mileage;
      state.user_address = action.payload.user_address;
    },
    logout: (state) => {
      state.token = "";
      state.user_id = "";
      state.user_name = "";
      state.user_mileage = 0;
      state.user_address = "";
    },
  },
});

export const { updateMileage, login, logout } = userSlice.actions;

export default userSlice.reducer;
