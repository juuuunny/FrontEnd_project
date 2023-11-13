import { createSlice } from "@reduxjs/toolkit";

export const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    num: 0,
    isNumber1: false,
    isNumber2: false,
    isNumber3: false,
    isNumber4: false,
    isNumber5: false,
    isNumber6: false,
    isNumber7: false,
  },
  reducers: {
    plusNum: (state, action) => {
      state.num = state.num + 1;
    },
    quiz1Check: (state, action) => {
      state.isNumber1 = true;
    },
    quiz2Check: (state, action) => {
      state.isNumber2 = true;
    },
    quiz3Check: (state, action) => {
      state.isNumber3 = true;
    },
    quiz4Check: (state, action) => {
      state.isNumber4 = true;
    },
    quiz5Check: (state, action) => {
      state.isNumber5 = true;
    },
    quiz6Check: (state, action) => {
      state.isNumber6 = true;
    },
    quiz7Check: (state, action) => {
      state.isNumber7 = true;
    },
    quizQuit: (state) => {
      state.num = 0;
      state.isNumber1 = false;
      state.isNumber2 = false;
      state.isNumber3 = false;
      state.isNumber4 = false;
      state.isNumber5 = false;
      state.isNumber6 = false;
      state.isNumber7 = false;
    },
  },
});

export const {
  plusNum,
  quiz1Check,
  quiz2Check,
  quiz3Check,
  quiz4Check,
  quiz5Check,
  quiz6Check,
  quiz7Check,
  quizQuit,
} = quizSlice.actions;

export default quizSlice.reducer;
