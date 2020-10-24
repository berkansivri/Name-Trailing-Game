import React, { useCallback, useEffect, useState } from 'react'
import names from '../names.json'
import Timer from './Timer'
import Winner from './Winner'
import { useSpeechRecognition, useSpeechSynthesis } from 'react-speech-kit'
import Loading from 'react-simple-loading'

const listenArgs = { lang: 'tr-TR', interimResults: false }
export default function Play() {
  const [currentName, setCurrentName] = useState('')
  const [usedNames, setUsedNames] = useState([])
  const [turn, setTurn] = useState('computer')
  const [winner, setWinner] = useState()
  const [speechResult, setSpeechResult] = useState()

  const { listen, stop: stopListen, listening: isListening } = useSpeechRecognition({
    onResult: (result) => {
      setSpeechResult(result.toLowerCase())
    },
  })
  const { speak } = useSpeechSynthesis()

  const startListen = useCallback(() => listen(listenArgs), [listen])

  const getRandomNumber = useCallback(() => ~~(Math.random() * names.length), [])

  const checkName = useCallback(
    (name = '') => !currentName || (currentName.slice(-1) === name[0] && !usedNames.includes(name)),
    [currentName, usedNames]
  )
  const pickName = useCallback(() => {
    let name
    do {
      name = names[getRandomNumber()]
    } while (!checkName(name))
    console.log('picked name', name)
    return name
  }, [checkName, getRandomNumber])

  useEffect(() => {
    console.log('turn effect')
    if (turn === 'computer') {
      setTimeout(() => {
        const name = pickName()
        setCurrentName(name)
        speak({ text: name })
        setTurn('user')
      }, 5 * 1000 + 1)
    } else {
      startListen()
    }
  }, [turn])

  useEffect(() => {
    if (speechResult) {
      console.log('speechResult', speechResult)
      setCurrentName(speechResult)
      if (checkName(speechResult)) {
        stopListen()
        setTurn('computer')
      } else {
        setWinner('computer')
      }
    }
  }, [speechResult])

  useEffect(() => {
    if (currentName) {
      setUsedNames((names) => [...names, currentName])
    }
  }, [currentName])

  const handleTimeout = useCallback(() => {
    setWinner('Computer')
  }, [setWinner])

  if (winner) {
    return <Winner winner={winner} usedNames={usedNames} />
  }

  return (
    <>
      <div>
        <h2>{currentName}</h2>
      </div>
      <div>{isListening ? <Timer seconds={8} onTimeout={handleTimeout} /> : <Loading color="white" />}</div>
    </>
  )
}
