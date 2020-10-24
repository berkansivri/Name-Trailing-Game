import { useReducer, useState, useEffect, useCallback } from 'react'
import { useSpeechRecognition, useSpeechSynthesis } from 'react-speech-kit'
import gameReducer from '../reducers/game'
import names from '../names.json'
import { checkName, pickName, loseComputerByRatio } from '../helpers'
import { LISTEN_ARGS, COMPUTER_WAIT_UNTIL, COMPUTER_LOSE_PERCENT_RATIO } from '../helpers/configs'

const initialState = { currentName: '', usedNames: [], winner: '' }

const useGame = () => {
  const [state, dispatch] = useReducer(gameReducer, initialState)
  const { currentName, usedNames, winner } = state
  const [turn, setTurn] = useState('computer')

  const { speak } = useSpeechSynthesis()
  const { listen, stop: stopListen } = useSpeechRecognition({
    onResult: (result) => handleSpeechResult(result.toLowerCase()),
  })

  const setWinner = useCallback(() => {
    dispatch({ type: 'setWinner', winner: 'computer' })
    stopListen()
  }, [dispatch, stopListen])

  const setCurrentName = useCallback((currentName) => {
    dispatch({ type: 'setCurrentName', currentName })
  }, [])

  const handleSpeechResult = useCallback(
    (name) => {
      setCurrentName(name)
      if (checkName(name, currentName, usedNames)) {
        setTurn('computer')
      } else {
        setWinner()
      }
    },
    [setTurn, currentName, usedNames, setWinner, setCurrentName]
  )

  const userPlay = useCallback(() => listen(LISTEN_ARGS), [listen])

  const computerPlay = useCallback(() => {
    stopListen()
    const timer = setTimeout(() => {
      if (loseComputerByRatio(COMPUTER_LOSE_PERCENT_RATIO)) {
        setWinner('User')
      } else {
        const name = pickName(names)
        setCurrentName(name)
        setTurn('user')
        speak({ text: name })
      }
    }, COMPUTER_WAIT_UNTIL)

    return () => clearTimeout(timer)
  }, [setCurrentName, setTurn, speak, stopListen, setWinner])

  useEffect(() => {
    if (turn === 'user') {
      userPlay()
    } else {
      computerPlay()
    }
    //eslint-disable-next-line
  }, [turn])

  return {
    currentName,
    usedNames,
    winner,
    turn,
    setWinner,
  }
}

export { useGame as default }
