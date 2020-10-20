import React, { useCallback, useState, useEffect } from 'react'
import names from '../names.json'
import useSpeechRecogniton from '../hooks/useSpeechRecognition'

const namesLength = names.length

export default function Play() {
  const [currentName, setCurrentName] = useState()
  const [usedNames, setUsedNames] = useState([])

  const { listen, stop, listening } = useSpeechRecogniton({
    onResult: (res) => {
      setCurrentName(res)
    },
  })

  const checkName = useCallback((name) => {}, [])

  const getRandomNumber = useCallback(() => ~~(Math.random() * namesLength), [])

  const pickName = useCallback(() => {
    let random = getRandomNumber()
    while (usedNames.includes(names[random])) {
      random = getRandomNumber()
    }
    setUsedNames((used) => [...used, names[random]])
    setCurrentName(names[random])
  }, [])

  useEffect(() => {
    pickName()
  }, [])

  return (
    <>
      <div>
        <p>{currentName}</p>
      </div>
      <button onMouseDown={listen} onMouseUp={stop}>
        {listening ? 'Stop 🛑' : 'Listen 🎤'}
      </button>
    </>
  )
}
