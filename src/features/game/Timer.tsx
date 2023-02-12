import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { millisecondsToTime } from '../../helpers/millisecondsToTime'
import { setGameState, setTime } from '../../redux/gameSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'

const StyledDiv = styled.div`
  font-family: monospace;
  font-size: large;
  padding: 0.2em;
  border: ${(props) => props.theme.bd};
  border-radius: ${(props) => props.theme.bdRad};
`

export const Timer = () => {
  const gamestate = useAppSelector((state) => state.game.gameState)
  const time = useAppSelector((state) => state.game.currentTime)
  const dateRef = useAppSelector((state) => state.game.startTime)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (gamestate === 'notStarted') {
      dispatch(setGameState('inProgress'))
    }
    const interval = setInterval(() => {
      let now = Date.now()
      let dt = now - dateRef
      dispatch(setTime(dt))
    }, 50)
    if (gamestate === 'finished') {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [gamestate])

  return <StyledDiv>{millisecondsToTime(time)}</StyledDiv>
}
