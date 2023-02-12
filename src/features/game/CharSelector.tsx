import styled from 'styled-components'

type DropdownProps = {
  className?: string
  handleDropdownClick: Function
  x: number
  y: number
  charlist: String[]
}

const StyledDiv = styled.div`
  position: absolute;
  z-index: 2;
  background-color: ${(props) => props.theme.bg};
  border: ${(props) => props.theme.bd};
  border-radius: ${(props) => props.theme.bdRad};
  padding: 0.2em;
  pointer-events: none;
  & ul {
    pointer-events: all;
    list-style: none;
    padding: 0;
    & li:hover {
      cursor: pointer;
      background: gray;
      color: white;
    }
  }
  & > div {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    visibility: transparent;
    pointer-events: all;
    z-index: -1;
  }
`

function CharSelector(props: DropdownProps) {
  return (
    <StyledDiv
      style={{
        top: `${props.y}px`,
        left: `${props.x}px`,
      }}>
      Chose pokemon:
      <ul>
        {props.charlist.map((character, index) => (
          <li
            key={index}
            onClick={() => props.handleDropdownClick(character)}>
            {character.charAt(0).toUpperCase() + character.slice(1)}
          </li>
        ))}
      </ul>
      <div onClick={() => props.handleDropdownClick('none')}></div>
    </StyledDiv>
  )
}

export default CharSelector
