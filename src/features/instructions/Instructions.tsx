import React from 'react'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { reset, setGameState } from '../../redux/gameSlice'
import alakazam from '../../assets/alakazam.png'
import charizard from '../../assets/charizard.png'
import eevee from '../../assets/eevee.png'
import psyduck from '../../assets/psyduck.png'
import { useNavigate } from 'react-router-dom'

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  place-items: center;
  gap: 0.2em;
  & .pokemonsContainer {
    display: flex;
    place-content: center;
  }
`
const ImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  place-items: center;
  align-content: space-between;
`

const StyledImg = styled.img`
  max-height: 150px;
  object-fit: contain;
`
const StyledButton = styled.button`
  font-size: large;
  transition: all 250ms;
  padding: 0.5em;
  background-color: ${(props) => props.theme.bg};
  border: ${(props) => props.theme.bd};
  border-radius: ${(props) => props.theme.bdRad};
  &:hover {
    cursor: pointer;
    border-color: azure;
  }
`

function Instructions() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const gameState = useAppSelector((state) => state.game.gameState)
  const handleStart = () => {
    if (gameState === 'notStarted' || gameState === 'finished') {
      dispatch(reset())
      dispatch(setGameState('inProgress'))
      navigate('/game')
    } else {
      navigate('/game')
    }
  }
  const handleRestart = () => {
    dispatch(reset())
    dispatch(setGameState('inProgress'))
    navigate('/game')
  }
  return (
    <StyledDiv>
      <h3>Welcome!</h3>
      <p>You aim is to find those pokemon on the picture:</p>
      <div className='pokemonsContainer'>
        <ImgContainer>
          Alakazam
          <StyledImg src={alakazam} />
        </ImgContainer>
        <ImgContainer>
          Eevee
          <StyledImg src={eevee} />
        </ImgContainer>
        <ImgContainer>
          Charizard
          <StyledImg src={charizard} />
        </ImgContainer>
        <ImgContainer>
          Psyduck
          <StyledImg src={psyduck} />
        </ImgContainer>
      </div>
      <StyledButton onClick={handleStart}>
        {gameState === 'notStarted' || gameState === 'finished'
          ? `Start`
          : gameState === 'inProgress' && `Return`}
      </StyledButton>
      {gameState === 'inProgress' && (
        <StyledButton onClick={handleRestart}>Restart</StyledButton>
      )}
    </StyledDiv>
  )
}

export default Instructions
