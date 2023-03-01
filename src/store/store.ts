import { combineReducers, configureStore } from "@reduxjs/toolkit";
import  userReducer  from "./slice/userSlice";
import  uiReducer  from "./slice/uiSlice";

import { loadState } from "./utils/storage";

const reducer = combineReducers({
    user: userReducer,
    ui: uiReducer
  });
  


export default configureStore({
    devTools: true,
    reducer,
    preloadedState: loadState(),
  });