import React, { useState, useCallback, useEffect } from 'react'
import Game from './Game'
import Play from './Play'

export default function Start() {
  const [hasPermission, setHasPermission] = useState(false)

  useEffect(() => {
    console.log(hasPermission)
  }, [hasPermission])

  const requestPermission = useCallback(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => {
        setHasPermission(true)
      })
      .catch((err) => {
        setHasPermission(false)
        alert('You need to give the permission for mic before start the game')
      })
  }, [])

  return hasPermission ? <Play /> : <button onClick={requestPermission}>Start the Game</button>
}
