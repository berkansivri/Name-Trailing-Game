import React, { useState } from 'react'
import Play from './Play'

export default function Start() {
  const [hasPermission, setHasPermission] = useState(false)
  function onStart() {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(function (stream) {
        setHasPermission(true)
      })
      .catch(function (err) {
        setHasPermission(false)
        alert('You need to give the permission for mic before start the game')
      })
  }

  return hasPermission ? <Play /> : <button onClick={onStart}>Start the Game</button>
}
