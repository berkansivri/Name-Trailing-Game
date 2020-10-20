import { useEffect, useRef, useState, useCallback } from 'react'

const useSpeechRecognition = (props = {}) => {
  const { onResult = () => {} } = props
  const [listening, setListening] = useState()
  const recognition = useRef(null)

  const getResult = (event) => {
    console.log(event)
    const transcript = Array.from(event.results)
      .map((res) => res[0].transcript)
      .join('')
    onResult(transcript)
  }

  const listen = useCallback(
    (args = {}) => {
      console.log('listen func')
      const { lang = 'tr-TR', grammars, interimResults = false, continuous = false, maxAlternatives = 1 } = args
      setListening(true)
      recognition.current.onresult = getResult
      recognition.current.lang = lang
      recognition.current.interimResults = interimResults
      recognition.current.continuous = continuous
      recognition.current.maxAlternatives = maxAlternatives
      if (grammars) {
        recognition.current.grammars = grammars
      }

      recognition.current.start()
    },
    [listening, recognition]
  )

  const stop = useCallback(() => {
    if (!listening) return
    recognition.current.onresult = () => {}
    setListening(false)
    recognition.current.stop()
  }, [listening, recognition])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

    if (!window.SpeechRecognition) {
      alert('Speech recognition is not supported by your browser')
    } else {
      recognition.current = new window.SpeechRecognition()
    }
  }, [])

  return {
    listen,
    stop,
    listening,
  }
}

export default useSpeechRecognition
