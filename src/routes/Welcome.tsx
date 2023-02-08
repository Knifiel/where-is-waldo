import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Welcome = styled(Element)`
  display: flex;
  flex-direction: column;
  place-items: center;
  & a {
    color: inherit;
  }
`

function Element(props: any) {
  return (
    <div className={props.className}>
      <h1>Welcome to 'Where is the pokemon?</h1>
      <p>Your aim is to find those four pokemons on the picture.</p>
      <section>TODO: Put sprites of pokemon here</section>
      <p>
        Click <Link to='/game'>Play</Link> to start, click{' '}
        <Link to='highscores'>Highscores</Link> to see how long it took you or
        others to find them!
      </p>
    </div>
  )
}

export default Welcome
