import React from 'react'

export default function Winner({ winner, usedNames, startNewGame }) {
  return (
    <>
      {winner && <h1>Winner is {winner}!</h1>}
      <button className="btn-start" onClick={startNewGame}>
        New Game
      </button>
      <ul className="name-list">
        {usedNames.map((name) => (
          <li className="item" key={name}>
            {name + '->'}
          </li>
        ))}
      </ul>
    </>
  )
}
