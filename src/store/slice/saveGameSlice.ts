import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    isSaved: false,
    level:null,
    time:null,
    itemArray:null,
    itemLeft: null,
}
const userSlice = createSlice({
    name: 'saveGame',
    initialState,
    reducers: {
      updateSave: (state, action) => {
        return state
      },
      getSave: (state, action) => {
        return state
      }
  
    },
  })


export {userSlice}


