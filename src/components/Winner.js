import React from 'react'

export default function Winner({ winner, usedNames }) {
  return (
    <>
      {winner && <h1>Winner is {winner}!</h1>}
      <p>{usedNames.join('->')}</p>
    </>
  )
}
