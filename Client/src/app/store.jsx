import { configureStore } from '@reduxjs/toolkit'
import authReducer from "../Features/aunthiSlice"
import guestReducer from "../Features/guestSlice"
export default configureStore({
  reducer: {
    auth: authReducer,
    guest: guestReducer,

  }

})