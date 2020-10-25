import { useReducer, useState, useEffect, useCallback } from 'react'
import { useSpeechRecognition, useSpeechSynthesis } from 'react-speech-kit'
import gameReducer from '../reducers/game'
import { checkName, pickName, loseComputerByRatio, getRandomNumber } from '../helpers'

const initialState = { currentName: '', usedNames: [], winner: '' }

const useGame = (nameSet = [], listenArgs, computerWaitTime = 0, computerLoseRatio = 0) => {
  const [state, dispatch] = useReducer(gameReducer, initialState)
  const { currentName, usedNames, winner } = state
  const [turn, setTurn] = useState('computer')

  const { speak } = useSpeechSynthesis()
  const { listen, stop: stopListen } = useSpeechRecognition({
    onResult: (result) => handleSpeechResult(result.toLowerCase()),
  })

  const setWinner = useCallback(
    (winner) => {
      stopListen()
      dispatch({ type: 'setWinner', winner })
    },
    [dispatch, stopListen]
  )

  const setCurrentName = useCallback((currentName) => {
    dispatch({ type: 'setCurrentName', currentName })
  }, [])

  const handleSpeechResult = useCallback(
    (name) => {
      stopListen()
      setCurrentName(name)
      if (checkName(name, currentName, usedNames)) {
        setTurn('computer')
      } else {
        setWinner('computer')
      }
    },
    [setTurn, currentName, usedNames, setWinner, setCurrentName, stopListen]
  )

  const userPlay = useCallback(() => listen(listenArgs), [listen, listenArgs])

  const computerPlay = useCallback(() => {
    const timer = setTimeout(() => {
      if (currentName && loseComputerByRatio(computerLoseRatio)) {
        console.log(`Computer lost (${computerLoseRatio}% probability)`)
        setWinner('user')
      } else {
        const name = pickName(currentName, usedNames, nameSet)
        setCurrentName(name)
        setTurn('user')
        speak({ text: name })
      }
    }, getRandomNumber(computerWaitTime, 1) * 1000)

    return () => clearTimeout(timer)
  }, [setCurrentName, currentName, usedNames, setTurn, speak, setWinner, nameSet, computerWaitTime, computerLoseRatio])

  useEffect(() => {
    if (turn === 'user') {
      userPlay()
    } else {
      computerPlay()
    }
    //eslint-disable-next-line
  }, [turn])

  const startNewGame = useCallback(() => {
    dispatch({ type: 'newGame', initialState })
    setTurn()
  }, [])

  return {
    currentName,
    usedNames,
    winner,
    turn,
    setWinner,
    startNewGame,
  }
}

export { useGame as default }
