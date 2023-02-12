import CharSelector from './CharSelector'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import {
  characterFound,
  setClickCoords,
  setGameState,
  setGuessState,
} from '../../redux/gameSlice'
import { getPokemon } from '../../firebase/apiCalls'

type gameScreenProps = {
  imageURL: string
}
type RecticleProp = {
  visibility: string
}
type RootProps = {
  showMouse: boolean
}

const RecticleDiv = styled.div<RecticleProp>`
  position: fixed;
  width: 100px;
  height: 100px;
  border: 2px dashed white;
  z-index: 1;
  background-color: rgba(1, 1, 1, 0.5);
  pointer-events: none;
  visibility: ${(props) => props.visibility};
`
const RootDiv = styled.div<RootProps>`
  position: relative;
  width: 1500px;
  height: 1061px;
  max-width: 1500px;
  max-height: 1061px;
  &:hover {
    cursor: ${(props) => (props.showMouse ? 'normal' : 'none')};
  }
`

const Flag = styled.div<any>`
  position: absolute;
  top: ${(props) => props.y - 50}px;
  left: ${(props) => props.x - 50}px;
  border: 5px dashed #0b4905bc;
  border-radius: 50px;
  background-color: transparent;
  height: 100px;
  width: 100px;
  pointer-events: none;
`
export const GameScreen = (props: gameScreenProps) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const [visibity, setVisibity] = useState('hidden')
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false)

  const dispatch = useAppDispatch()

  const clickCoords = useAppSelector((state) => state.game.clickCoords)
  const foundCharacters = useAppSelector((state) => state.game.foundCharacters)
  const charsToFind = useAppSelector((state) => state.game.charactersToFind)
  const gameState = useAppSelector((state) => state.game.gameState)

  useEffect(() => {
    if (charsToFind.length === 0) {
      dispatch(setGameState('finished'))
    }
  }, [charsToFind])

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (dropdownIsOpen || charsToFind.length === 0) {
      return
    }
    const rect = e.currentTarget.getBoundingClientRect()
    const x = Math.round(e.clientX - rect.left) //x position within the element.
    const y = Math.round(e.clientY - rect.top) //y position within the element.

    dispatch(setClickCoords({ x, y }))
    setDropdownIsOpen(true)
  }

  const drawTargetRecticle = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setCoords({
      x: e.clientX - 50,
      y: e.clientY - 50,
    })
  }

  const handleDropdownClick = async (character: String) => {
    setDropdownIsOpen(false)
    if (character === 'none') {
      return
    }

    try {
      const char = {
        name: character,
        x: clickCoords.x,
        y: clickCoords.y,
      }

      dispatch(setGuessState('loading'))
      const pokemonData = await getPokemon(char.name)
      pokemonData.forEach((doc) => {
        const pokemon = doc.data()
        const deltaX = Math.abs(pokemon.x - char.x)
        const deltaY = Math.abs(pokemon.y - char.y)
        if (deltaX < 51 && deltaY < 51) {
          dispatch(
            characterFound({ name: pokemon.name, x: pokemon.x, y: pokemon.y })
          )
          dispatch(setGuessState('correct'))
        } else {
          dispatch(setGuessState('wrong'))
        }
      })
    } catch (e) {
      dispatch(setGuessState('none'))
      console.error(e)
    }
  }

  const handleVisibility = (e: React.BaseSyntheticEvent) => {
    if (e.type === 'mouseleave' || gameState === 'finished') {
      setVisibity('hidden')
    } else {
      setVisibity('normal')
    }
  }
  const handleMouse = () => {
    if (gameState !== 'inProgress' || dropdownIsOpen) {
      return true
    }
    return false
  }

  return (
    <>
      <RootDiv
        onMouseUp={(e) => handleClick(e)}
        onMouseMove={(e) => {
          drawTargetRecticle(e)
          handleVisibility(e)
        }}
        onMouseLeave={(e) => handleVisibility(e)}
        showMouse={handleMouse()}>
        <img src={props.imageURL}></img>
        {dropdownIsOpen ? (
          <CharSelector
            handleDropdownClick={handleDropdownClick}
            y={clickCoords.y}
            x={clickCoords.x}
            charlist={charsToFind}
          />
        ) : (
          gameState !== 'finished' && (
            <RecticleDiv
              style={{ top: `${coords.y}px`, left: `${coords.x}px` }}
              visibility={visibity}
            />
          )
        )}

        {foundCharacters.map((character, index) => (
          <Flag
            key={index}
            y={character.y}
            x={character.x}></Flag>
        ))}
      </RootDiv>
    </>
  )
}
