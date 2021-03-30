import { configureStore } from '@reduxjs/toolkit'

import loadingReducer from '@store/slices/loadingSlice/loadingSlice'

const store = configureStore({
  reducer: {
    loading: loadingReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store
