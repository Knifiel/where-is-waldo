import { createListenerMiddleware } from '@reduxjs/toolkit'
import { setGameState, setStartTime, reset } from './gameSlice'

export const listenerMiddleware = createListenerMiddleware()

listenerMiddleware.startListening({
  actionCreator: setGameState,
  effect: (action, listenerApi) => {
    if (action.payload === 'inProgress') {
      const time = Date.now()
      listenerApi.dispatch(setStartTime(time))
    }
  },
})
