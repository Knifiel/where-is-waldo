import React from 'react'
import { PictureFrame } from '../features/game/PictureFrame'
import image from '../assets/pokemon.jpg'
import styled from 'styled-components'
import GuessPopup from '../features/game/GuessPopup'
import { useAppSelector } from '../features/redux/hooks'
import Instructions from '../features/game/Instructions'

const Game = styled(Element)`
  display: flex;
  flex-direction: column;
  place-items: center;
`

function Element(props: any) {
  const gameState = useAppSelector((state) => state.game.gameState)
  return (
    <>
      <div className={props.className}>
        {gameState === 'notStarted' && <Instructions />}
        {gameState === 'inProgress' && <PictureFrame imageURL={image} />}
        {gameState === 'finished' && <ScoreSubmit />}
        <p>
          Picture by{' '}
          <a href='https://www.instagram.com/n.a.y.t.h/'>n.a.y.t.h</a>
        </p>
      </div>
      <GuessPopup />
    </>
  )
}

export default Game
