import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: null,
  type: null,
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notificationChange(state, action) {
      const { message, type } = action.payload
      return { message, type }
    },
    notificationDelete() {
      return initialState
    },
  },
})

export const { notificationChange, notificationDelete } =
  notificationSlice.actions

export const setNotification = (message, type, timer) => {
  return async (dispatch) => {
    dispatch(notificationChange({ message, type }))
    setTimeout(() => {
      dispatch(notificationDelete())
    }, timer * 1000)
  }
}

export default notificationSlice.reducer
