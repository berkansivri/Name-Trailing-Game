import React, { useEffect, useCallback } from 'react'
import usePlay from '../hooks/usePlay'
import Timer from './Timer'
import Winner from './Winner'

export default function Game() {
  const { userPlay, computerPlay, setWinner, currentName, turn, winner, usedNames } = usePlay()

  useEffect(() => {
    console.log('turn', turn)
    if (turn === 'computer') {
      userPlay()
    } else {
      computerPlay()
    }
  }, [turn, computerPlay, userPlay])

  const handleTimeout = useCallback(() => {
    setWinner('Computer')
  }, [setWinner])

  return (
    <>
      <div>
        <h2>{currentName}</h2>
      </div>
      {turn === 'User' && <Timer seconds={8} onTimeout={handleTimeout} />}
      {winner && <Winner winner={winner} usedNames={usedNames} />}
    </>
  )
}
