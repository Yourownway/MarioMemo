import { combineReducers, configureStore } from "@reduxjs/toolkit";
import  userReducer  from "./slice/userSlice";
import  uiReducer  from "./slice/uiSlice";
import gameReducer from "./slice/gameSlice"
import { loadState } from "./utils/storage";

const reducer = combineReducers({
    user: userReducer,
    ui: uiReducer,
    game:gameReducer
  });
  


export default configureStore({
    devTools: true,
    reducer,
    preloadedState: loadState(),
  });