import React, { useState, useCallback } from 'react'
import Game from './Game'

export default function Start() {
  const [hasPermission, setHasPermission] = useState(false)

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

  return hasPermission ? <Game /> : <button onClick={requestPermission}>Start the Game</button>
}
