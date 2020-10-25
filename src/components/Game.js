import React, { useCallback } from 'react'
import Loading from 'react-simple-loading'
import Timer from './Timer'
import Winner from './Winner'
import useGame from '../hooks/useGame'
import nameSet from '../names.json'
import { USER_WAIT_TIME, LISTEN_ARGS, COMPUTER_WAIT_UNTIL, COMPUTER_LOSE_RATIO } from '../helpers/configs'

export default function Play() {
  const { currentName, usedNames, winner, turn, setWinner, startNewGame } = useGame(
    nameSet,
    LISTEN_ARGS,
    COMPUTER_WAIT_UNTIL,
    COMPUTER_LOSE_RATIO
  )

  const handleTimeout = useCallback(() => {
    setWinner('computer')
  }, [setWinner])

  if (winner) {
    return <Winner winner={winner} usedNames={usedNames} startNewGame={startNewGame} />
  }

  return (
    <>
      <h3>{currentName}</h3>
      {turn === 'user' ? <Timer seconds={USER_WAIT_TIME} onTimeout={handleTimeout} /> : <Loading color="white" />}
    </>
  )
}
