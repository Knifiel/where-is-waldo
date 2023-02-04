import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface AdminLoginState {
  isLoggedIn: boolean
}

const initialState = { isLoggedIn: false } as AdminLoginState

const adminLoginSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    toggle(state) {
      state.isLoggedIn = !state.isLoggedIn
    },
  },
})

export const { toggle } = adminLoginSlice.actions
export default adminLoginSlice.reducer
