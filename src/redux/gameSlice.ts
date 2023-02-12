import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import type { characterPosition } from '../types'

interface GameState {
  clickCoords: {
    x: number
    y: number
  }

  guessState: 'none' | 'correct' | 'wrong' | 'loading'

  charactersToFind: string[]

  foundCharacters: characterPosition[]

  gameState: 'notStarted' | 'inProgress' | 'finished'

  currentTime: number
  startTime: number
}

const initialState: GameState = {
  clickCoords: {
    x: 0,
    y: 0,
  },
  charactersToFind: ['alakazam', 'charizard', 'eevee', 'psyduck'],
  foundCharacters: [],
  guessState: 'none',
  gameState: 'notStarted',
  currentTime: 0,
  startTime: 0,
}

export const gameStateSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setClickCoords: (state, action: PayloadAction<any>) => {
      state.clickCoords = {
        x: action.payload.x,
        y: action.payload.y,
      }
    },

    setGuessState: (
      state,
      action: PayloadAction<'none' | 'correct' | 'wrong' | 'loading'>
    ) => {
      state.guessState = action.payload
    },
    characterFound: (state, action: PayloadAction<characterPosition>) => {
      state.foundCharacters.push(action.payload)
      state.charactersToFind = state.charactersToFind.filter(
        (name) => name !== String(action.payload.name)
      )
    },
    setGameState: (
      state,
      action: PayloadAction<'notStarted' | 'inProgress' | 'finished'>
    ) => {
      state.gameState = action.payload
    },
    setTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload
    },
    setStartTime: (state, action: PayloadAction<number>) => {
      state.startTime = action.payload
    },
    reset: (state) => (state = initialState),
  },
})

export const {
  setClickCoords,
  setGuessState,
  setGameState,
  characterFound,
  setTime,
  setStartTime,
  reset,
} = gameStateSlice.actions
export default gameStateSlice.reducer
