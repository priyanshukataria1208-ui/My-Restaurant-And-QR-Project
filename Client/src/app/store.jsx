import { configureStore } from '@reduxjs/toolkit'
import authReducer from"../Features/aunthiSlice"
export default configureStore({
  reducer: {
    auth:authReducer,

  }
})