import { configureStore } from '@reduxjs/toolkit'
import gameSlice from './gameSlice'
import { listenerMiddleware } from './listenerMiddleware'

const store = configureStore({
  reducer: {
    game: gameSlice,
  },
  middleware: (gDM) => gDM().concat(listenerMiddleware.middleware),
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
