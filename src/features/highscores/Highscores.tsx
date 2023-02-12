import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getHighscores } from '../../firebase/apiCalls'
import { millisecondsToTime } from '../../helpers/millisecondsToTime'

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  & > ol > li {
    display: flex;
    justify-content: space-between;
    gap: 1em;
  }
`
function Highscores() {
  const [loading, setLoading] = useState(false)
  const [highscores, setHighscores] = useState([] as any)

  const fetchScores = async () => {
    setLoading(true)
    const res = await getHighscores()
    setHighscores([...res])
    setLoading(false)
  }
  useEffect(() => {
    fetchScores()
  }, [])

  if (loading) {
    return (
      <StyledDiv>
        <h3>Loading...</h3>
      </StyledDiv>
    )
  } else {
    return (
      <StyledDiv>
        <ol>
          {highscores.map((score: any) => (
            <li key={score.id}>
              <span>{score.name}</span>
              <span>{millisecondsToTime(score.time)}</span>
            </li>
          ))}
        </ol>
      </StyledDiv>
    )
  }
}
export default Highscores
