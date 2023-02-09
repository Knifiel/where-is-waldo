import React from 'react'
import styled from 'styled-components'
import { useAppDispatch } from '../redux/hooks'
import { setGameState } from '../redux/gameSlice'
import alakazam from '../../assets/alakazam.png'
import charizard from '../../assets/charizard.png'
import eevee from '../../assets/eevee.png'
import psyduck from '../../assets/psyduck.png'

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  place-items: center;
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
  const handleStart = () => {
    dispatch(setGameState('inProgress'))
  }

  return (
    <StyledDiv>
      You will need to find following pokemon on the picrute after clicking
      "Start" button:
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
      <StyledButton onClick={handleStart}>Start</StyledButton>
    </StyledDiv>
  )
}

export default Instructions
