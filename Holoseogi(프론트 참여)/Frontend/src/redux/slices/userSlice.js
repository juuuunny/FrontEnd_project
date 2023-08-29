import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userToken: "",
    userId: "",
    userName: "",
    userImg: "",
    userEmail: "",
    userGender: "",
    userAge: "",
    userPhone: "",
    userRegion: "",
    userRole: "",
  },
  reducers: {
    login: (state, action) => {
      state.userToken = action.payload.userToken;
      state.userId = action.payload.userId;
      state.userName = action.payload.userName;
      state.userImg = action.payload.userImg;
      state.userEmail = action.payload.userEmail;
      state.userGender = action.payload.userGender;
      state.userAge = action.payload.userAge;
      state.userPhone = action.payload.userPhone;
      state.userRegion = action.payload.userRegion;
      state.userRole = action.payload.userRole;
    },
    logout: (state) => {
      state.userToken = "";
      state.userId = "";
      state.userName = "";
      state.userImg = "";
      state.userEmail = "";
      state.userGender = "";
      state.userAge = "";
      state.userPhone = "";
      state.userRegion = "";
      state.userRole = "";
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
