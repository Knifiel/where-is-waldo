import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import styled from 'styled-components'

export const StyledNavbar = styled.nav`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, 100px);
  place-items: center;
  background-color: inherit;
  justify-content: center;
  gap: 1em;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-color: inherit;
  & > a {
    color: inherit;
    text-decoration: none;
  }
  & .active {
    font-weight: bolder;
  }
`

function Navbar(props: any) {
  return (
    <StyledNavbar className={`${props.className} navbar`}>
      <NavLink to='/'>How to play</NavLink>
      <NavLink to='/game'>Game</NavLink>
      <NavLink to='/highscores'>Highscores</NavLink>
    </StyledNavbar>
  )
}
export default Navbar
