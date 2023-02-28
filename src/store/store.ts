import { combineReducers, configureStore } from "@reduxjs/toolkit";
import  userReducer  from "./slice/userSlice";

const reducer = combineReducers({
    user: userReducer,
  });
  
export default configureStore({
    reducer
})