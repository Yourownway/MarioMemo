import { combineReducers, configureStore, PreloadedState } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import uiReducer from "./slice/uiSlice";
import gameReducer from "./slice/gameSlice"
import { loadState } from "./utils/storage";

const reducer = combineReducers({
  user: userReducer,
  ui: uiReducer,
  game: gameReducer
});




export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: reducer,
    preloadedState,
    devTools: true,
  })
}

export type RootState = ReturnType<typeof reducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

export default setupStore(loadState())