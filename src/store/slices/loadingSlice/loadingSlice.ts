import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '@store/store'

interface LoadingState {
  state: boolean
}

const initialState: LoadingState = { state: false }

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLaodingState: (state, action: PayloadAction<boolean>) => ({
      state: action.payload,
    }),
  },
})

export const { setLaodingState } = loadingSlice.actions
export const selectLoadingState = (state: RootState): boolean =>
  state.loading.state
export default loadingSlice.reducer
