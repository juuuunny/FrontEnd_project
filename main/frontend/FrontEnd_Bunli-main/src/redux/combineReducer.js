import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import quizSlice from "./slices/quizSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "quiz"],
};

const rootReducer = combineReducers({
  user: userSlice,
  quiz: quizSlice,
});
export default persistReducer(persistConfig, rootReducer);

// export default rootReducer;
