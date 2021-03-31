import { configureStore } from '@reduxjs/toolkit'

import loadingReducer from '@store/slices/loadingSlice/loadingSlice'
import notificationReducer from '@store/slices/notificationSlice/notificationSlice'

const store = configureStore({
  reducer: {
    loading: loadingReducer,
    notification: notificationReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store
