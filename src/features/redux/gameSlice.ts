import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import type { characterPosition } from '../../types'

interface GameState {
  clickCoords: {
    x: number
    y: number
  }

  charactersToFind: string[]

  foundCharacters: characterPosition[]

  isLoading: boolean
}

const initialState: GameState = {
  clickCoords: {
    x: 0,
    y: 0,
  },
  charactersToFind: ['alakazam', 'charizard', 'eevee', 'psyduck'],
  foundCharacters: [],
  isLoading: false,
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

    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    characterFound: (state, action: PayloadAction<characterPosition>) => {
      state.foundCharacters.push(action.payload)
      state.charactersToFind.filter((x) => x !== action.payload.name)
    },
    reset: () => initialState,
  },
})

export const { setClickCoords, setIsLoading, characterFound, reset } =
  gameStateSlice.actions
export default gameStateSlice.reducer
