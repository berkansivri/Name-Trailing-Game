import React from 'react'
import { useEffect, useState } from 'react'
export default function Timer({ seconds, onTimeout }) {
  const [timeLeft, setTimeLeft] = useState(seconds)

  useEffect(() => {
    if (!timeLeft && typeof onTimeout === 'function') {
      onTimeout()
    }

    const id = setInterval(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)

    return () => clearInterval(id)
  }, [timeLeft, onTimeout])

  return <h5>{`Listening 🎤 (${timeLeft})`}</h5>
}
