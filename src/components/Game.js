import React from 'react'
import Timer from './Timer'
import Winner from './Winner'
import Loading from 'react-simple-loading'
import useGame from '../hooks/useGame'
import { USER_WAIT_TIME } from '../helpers/configs'

export default function Play() {
  const { currentName, usedNames, winner, turn, setWinner } = useGame()

  if (winner) {
    return <Winner winner={winner} usedNames={usedNames} />
  }

  return (
    <>
      <h3>{currentName}</h3>
      {turn === 'user' ? <Timer seconds={USER_WAIT_TIME} onTimeout={setWinner} /> : <Loading color="white" />}
    </>
  )
}
