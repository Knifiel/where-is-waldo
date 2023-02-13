import React, { useState } from 'react'
import styled from 'styled-components'
import { reset } from '../../redux/gameSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { useNavigate } from 'react-router-dom'
import { millisecondsToTime } from '../../helpers/millisecondsToTime'
import { addHighscore } from '../../firebase/apiCalls'

const GameEndDiv = styled.div`
  padding: 1em;
  position: absolute;
  max-width: 80%;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  border: ${(props) => props.theme.bd};
  border-radius: ${(props) => props.theme.bdRad};
  background: ${(props) => props.theme.bg};
  text-align: center;
`

const GameEnd = () => {
  const time = useAppSelector((state) => state.game.currentTime)
  const [name, setName] = useState('Anonimous')
  const [isSending, setIsSending] = useState(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (name.length > 50) {
      return
    }
    const docData = {
      name,
      time,
    }
    try {
      setIsSending(true)
      await addHighscore(docData)
      dispatch(reset())
      navigate('/highscores')
    } catch (e) {
      setIsSending(false)
      console.error(e)
      alert(
        'There was an error trying to send highscores. Please try again later'
      )
    }
  }

  const handleCancel = () => {
    navigate('/')
    dispatch(reset())
  }
  return (
    <GameEndDiv>
      {!isSending ? (
        <>
          <h1>Finished</h1>
          <h3>Good Job finding those pokemon!</h3>
          <p>Your time is {millisecondsToTime(time)}.</p>
          <p>
            To send your time to higscores, input your name below and press
            'Send'
          </p>
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input
                type='text'
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                }}
                maxLength={50}
              />
            </label>
            <button type='submit'>Send</button>
            <button
              type='button'
              onClick={handleCancel}>
              Cancel
            </button>
          </form>
        </>
      ) : (
        <h1>Sending data to server. Please wait...</h1>
      )}
    </GameEndDiv>
  )
}

export default GameEnd
