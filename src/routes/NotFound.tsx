import React from 'react'
import styled from 'styled-components'

export const StyledNotFound = styled(NotFound)`
  display: grid;
  & h1 {
    grid-row: 1;
    font-size: 5em;
  }
  & p {
    grid-row: 2;
    font-size: 2em;
  }
`
function NotFound(props: any) {
  return (
    <div className={props.className}>
      <h1>Page not found</h1>
      <p>Requested page cannot be found on the server</p>
    </div>
  )
}

export default NotFound
