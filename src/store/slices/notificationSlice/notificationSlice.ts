import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '@store/store'

interface NotificationState {
  state: boolean
}

const initialState: NotificationState = { state: false }

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotificationState: (state, action: PayloadAction<boolean>) => ({
      state: action.payload,
    }),
  },
})

export const { setNotificationState } = notificationSlice.actions
export const selectLoadingState = (state: RootState): boolean =>
  state.loading.state
export default notificationSlice.reducer
