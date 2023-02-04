import styled from 'styled-components'

type DropdownProps = {
  className?: string
  handleDropdownClick: Function
  x: number
  y: number
  charlist: String[]
}

const CharSelector = styled(Element)`
  position: fixed;
  z-index: 2;
  top: ${(props) => props.y}px;
  left: ${(props) => props.x + 50}px;
  background-color: white;
  border: 1px solid gray;
  border-radius: 5px;
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

function Element(props: DropdownProps) {
  return (
    <div className={props.className}>
      Chose character:
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
    </div>
  )
}

export default CharSelector
