import React from 'react'
import { PictureFrame } from '../features/game/PictureFrame'
import image from '../assets/pokemon.jpg'
import styled from 'styled-components'

const Game = styled(Element)`
  display: flex;
  flex-direction: column;
  place-items: center;
  justify-items: space-around;
`
function Element(props: any) {
  return (
    <div className={props.className}>
      <PictureFrame imageURL={image} />
      <footer>
        Picture by <a href='https://www.instagram.com/n.a.y.t.h/'>n.a.y.t.h</a>
      </footer>
    </div>
  )
}

export default Game
