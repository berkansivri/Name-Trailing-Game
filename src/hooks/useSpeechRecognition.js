import { useEffect, useRef, useState, useCallback } from 'react'

const useSpeechRecognition = (args = {}) => {
  const { lang = 'tr-TR', grammars, interimResults = false, continuous = false, maxAlternatives = 1 } = args

  const recognition = useRef(null)
  const [isListening, setIsListening] = useState(false)
  const [result, setResult] = useState('')

  const getResult = useCallback((event) => {
    const transcript = event.results[0][0].transcript.toLowerCase()
    console.log('speech transcript', transcript)
    setResult(transcript)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!window.SpeechRecognition) {
      alert('Speech recognition is not supported by your browser')
    } else {
      recognition.current = new window.SpeechRecognition()
      recognition.current.onresult = getResult
      recognition.current.lang = lang
      recognition.current.interimResults = interimResults
      recognition.current.continuous = continuous
      recognition.current.maxAlternatives = maxAlternatives
      if (grammars) {
        recognition.current.grammars = grammars
      }
    }
  }, [continuous, getResult, grammars, interimResults, lang, maxAlternatives])

  const listen = () => {
    console.log('listen func')
    setIsListening(true)
    recognition.current.start()
  }

  const stop = () => {
    console.log('stoplisten func')
    console.log('is listening', isListening)
    if (!isListening) return
    setIsListening(false)
    console.log(recognition.current)
    recognition.current.stop()
  }

  return {
    listen,
    stop,
    isListening,
    result,
  }
}

export default useSpeechRecognition
