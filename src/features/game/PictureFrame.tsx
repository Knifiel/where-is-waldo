import CharSelector from './CharSelector'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { firestore } from '../../firebase/firebaseConfig'
import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  query,
  where,
} from '@firebase/firestore'

type pictureFrameProps = {
  imageURL: string
}
type RecticleProp = {
  visibility: string
}
type RootProps = {
  showMouse: boolean
  imageWidth: number
  imageHeight: number
}
type charType = {
  name: String
  x: number
  y: number
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
  width: ${(props) => props.imageWidth}px;
  height: ${(props) => props.imageHeight}px;
  max-width: ${(props) => props.imageWidth}px;
  max-height: ${(props) => props.imageHeight}px;
  &:hover {
    cursor: ${(props) => (props.showMouse ? 'normal' : 'none')};
  }
`

const Flag = styled.div<any>`
  position: absolute;
  top: ${(props) => props.y - 5}px;
  left: ${(props) => props.x - 5}px;
  border: 2px solid black;
  border-radius: 5px;
  background-color: red;
  height: 10px;
  width: 10px;
  pointer-events: none;
`
export const PictureFrame = (props: pictureFrameProps) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const [visibity, setVisibity] = useState('hidden')
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false)
  const [clickCoords, setClickCoords] = useState({ x: 0, y: 0 })
  const [dropdownCoords, setDropdownCoords] = useState({ x: 0, y: 0 })
  const [foundCharacters, setFoundCharacters] = useState([] as charType[])
  const [charsToFind, setcharsToFind] = useState([
    'alakazam',
    'charizard',
    'eevee',
    'psyduck',
  ] as string[])
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    async function getMeta(url: string) {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => resolve(img)
        img.onerror = (err) => reject(err)
        img.src = url
      })
    }
    async function getImageData(URL: string) {
      const img: HTMLImageElement | unknown = await getMeta(URL)
      if (img instanceof HTMLImageElement) {
        setImageDimensions({
          width: img.naturalWidth,
          height: img.naturalHeight,
        })
      }
    }
    try {
      getImageData(props.imageURL)
    } catch (e) {
      console.log(e)
    }
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (dropdownIsOpen) {
      return
    }
    const rect = e.currentTarget.getBoundingClientRect()
    const x = Math.round(e.clientX - rect.left) //x position within the element.
    const y = Math.round(e.clientY - rect.top) //y position within the element.
    setClickCoords({ x, y })
    setDropdownCoords({ ...coords })
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
    const char = {
      name: character,
      x: clickCoords.x,
      y: clickCoords.y,
    }

    const q = query(
      collection(firestore, 'pokemon'),
      where('name', '==', char.name)
    )
    let guessIsRight = false
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      const pokemon = doc.data()
      const deltaX = pokemon.x - char.x
      const deltaY = pokemon.y - char.y
      console.log('click at:', char)
      console.log(pokemon)
      console.log(deltaX, deltaY)
    })

    if (guessIsRight) {
      setFoundCharacters([...foundCharacters, char])
      setcharsToFind(charsToFind.filter((c) => c !== character))
    } else {
      return
    }
  }

  return (
    <RootDiv
      onMouseUp={(e) => handleClick(e)}
      onMouseMove={(e) => drawTargetRecticle(e)}
      onMouseEnter={() => setVisibity('visible')}
      onMouseLeave={() => setVisibity('hidden')}
      imageHeight={imageDimensions.height}
      imageWidth={imageDimensions.width}
      showMouse={dropdownIsOpen}>
      <img src={props.imageURL}></img>
      {dropdownIsOpen ? (
        <CharSelector
          handleDropdownClick={handleDropdownClick}
          y={dropdownCoords.y}
          x={dropdownCoords.x}
          charlist={charsToFind}
        />
      ) : (
        <RecticleDiv
          style={{ top: `${coords.y}px`, left: `${coords.x}px` }}
          visibility={visibity}
        />
      )}

      {foundCharacters.map((character, index) => (
        <Flag
          key={index}
          y={character.y}
          x={character.x}></Flag>
      ))}
    </RootDiv>
  )
}
