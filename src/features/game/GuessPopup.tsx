import React, { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { useAppSelector } from '../redux/hooks'

const appearAnimation = keyframes`
  0% {opacity: 0}
  100% {opacity: 1}
`
const dissapearAnimation = keyframes`
  0% {opacity: 1}
  100% {opacity: 0}
`

const StyledDiv = styled.div`
  z-index: 2;
  position: absolute;
  top: 20vh;
  left: 50%;
  transform: translate(-50%, 0%);
  pointer-events: none;
  background-color: ${(props) => props.theme.bg};
  border: ${(props) => props.theme.bd};
  border-radius: ${(props) => props.theme.bdRad};
  padding: 1em;
  font-size: larger;
  &.none {
    opacity: 0;
  }
  &.loading {
    animation-name: ${appearAnimation};
    animation-duration: 250ms;
    animation-direction: normal;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  }
  &.correct,
  &.wrong {
    animation-name: ${dissapearAnimation};
    animation-duration: 3s;
    animation-direction: normal;
    animation-fill-mode: forwards;
    animation-iteration-count: 1;
  }
`

function GuessPopup() {
  const wrongGuess = `Your guess was wrong!`
  const rightGuess = `Your guess was right!`
  const loading = `Checking guess...`
  const guessState = useAppSelector((state) => state.game.guessState)

  return (
    <StyledDiv className={guessState}>
      {guessState === 'loading' && loading}
      {guessState === 'correct' && rightGuess}
      {guessState === 'wrong' && wrongGuess}
    </StyledDiv>
  )
}

export default GuessPopup
