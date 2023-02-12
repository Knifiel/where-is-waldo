import React, { useEffect } from 'react'
import { GameScreen } from '../features/game/GameScreen'
import image from '../assets/pokemon.jpg'
import styled from 'styled-components'
import GuessPopup from '../features/game/GuessPopup'
import { useAppSelector } from '../redux/hooks'
import { Timer } from '../features/game/Timer'
import GameEnd from '../features/game/GameEnd'

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
        <Timer />
        <GameScreen imageURL={image} />

        {gameState === 'finished' && <GameEnd />}
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
