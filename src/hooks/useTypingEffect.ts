import { useState, useEffect, useCallback } from 'react'

interface UseTypingEffectOptions {
  texts: string[]
  typingSpeed?: number
  deletingSpeed?: number
  pauseDuration?: number
}

export function useTypingEffect({
  texts,
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 2000,
}: UseTypingEffectOptions) {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const [isPaused, setIsPaused] = useState(false)

  const currentText = texts[currentIndex]

  const typeNextChar = useCallback(() => {
    if (displayText.length < currentText.length) {
      setDisplayText(currentText.slice(0, displayText.length + 1))
    } else {
      setIsTyping(false)
      setIsPaused(true)
      setTimeout(() => {
        setIsPaused(false)
      }, pauseDuration)
    }
  }, [displayText, currentText, pauseDuration])

  const deleteChar = useCallback(() => {
    if (displayText.length > 0) {
      setDisplayText(displayText.slice(0, -1))
    } else {
      setIsTyping(true)
      setCurrentIndex((prev) => (prev + 1) % texts.length)
    }
  }, [displayText, texts.length])

  useEffect(() => {
    if (isPaused) return

    const timeout = setTimeout(
      isTyping ? typeNextChar : deleteChar,
      isTyping ? typingSpeed : deletingSpeed,
    )

    return () => clearTimeout(timeout)
  }, [isTyping, isPaused, typeNextChar, deleteChar, typingSpeed, deletingSpeed])

  return {
    text: displayText,
    isTyping,
    isComplete: displayText === currentText && !isTyping,
  }
}
