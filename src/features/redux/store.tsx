import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import adminLoginSlice from './adminLoginSlice'

const store = configureStore({
  reducer: adminLoginSlice,
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
