import React, { useRef, useEffect } from 'react'
import anime from 'animejs'

const Hello = () => {
  const textRefs = useRef([])
  const currentIndexRef = useRef(0)
  const typingIntervalRef = useRef(null)
  const animationTimeoutRef = useRef(null)

  // Configuration with timing parameters
  const config = {
    typingSpeed: 100, // ms per character when typing
    erasingSpeed: 200, // ms per character when erasing
    displayDuration: 3000, // ms to display complete word
    fadeDuration: 10 // ms for fade in/out
  }

  const helloTexts = [
    { text: 'Hello' },
    { text: 'Halo' },
    { text: '你好' },
    { text: 'こんにちは' }
  ]

  const clearAllAnimations = () => {
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current)
      typingIntervalRef.current = null
    }
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current)
      animationTimeoutRef.current = null
    }
  }

  const typeText = (element, fullText, onComplete) => {
    let i = 0
    element.textContent = ''
    element.style.opacity = 1

    clearAllAnimations()

    typingIntervalRef.current = setInterval(() => {
      if (i < fullText.length) {
        element.textContent += fullText.charAt(i)
        i++
      } else {
        clearAllAnimations()
        if (onComplete) onComplete()
      }
    }, config.typingSpeed)
  }

  const eraseText = (element, onComplete) => {
    const text = element.textContent
    let length = text.length

    clearAllAnimations()

    typingIntervalRef.current = setInterval(() => {
      if (length > 0) {
        element.textContent = text.substring(0, length - 1)
        length--
      } else {
        clearAllAnimations()
        if (onComplete) onComplete()
      }
    }, config.erasingSpeed)
  }

  useEffect(() => {
    textRefs.current.forEach((el, index) => {
      if (el) {
        el.style.color = helloTexts[index].color
        el.style.opacity = index === 0 ? '1' : '0'
        if (index === 0) {
          el.textContent = helloTexts[0].text
        } else {
          el.textContent = ''
        }
      }
    })

    const startNextAnimation = () => {
      const nextIndex = (currentIndexRef.current + 1) % helloTexts.length
      const currentEl = textRefs.current[currentIndexRef.current]
      const nextEl = textRefs.current[nextIndex]

      if (currentEl && nextEl) {
        eraseText(currentEl, () => {
          anime({
            targets: currentEl,
            opacity: 0,
            duration: config.fadeDuration,
            easing: 'easeInOutQuad',
            complete: () => {
              // Then fade in next element and type its text
              anime({
                targets: nextEl,
                opacity: 1,
                duration: config.fadeDuration,
                easing: 'easeInOutQuad',
                complete: () => {
                  typeText(nextEl, helloTexts[nextIndex].text, () => {
                    // After typing completes, wait displayDuration before starting next
                    animationTimeoutRef.current = setTimeout(() => {
                      currentIndexRef.current = nextIndex
                      startNextAnimation()
                    }, config.displayDuration)
                  })
                }
              })
            }
          })
        })
      }
    }

    // Start the first animation
    animationTimeoutRef.current = setTimeout(() => {
      startNextAnimation()
    }, config.displayDuration)

    return () => {
      clearAllAnimations()
    }
  }, [])

  return (
    <div>
      <div
        style={{
          position: 'relative',
          textAlign: 'center'
        }}
      >
        {helloTexts.map((item, index) => (
          <div
            key={index}
            ref={(el) => (textRefs.current[index] = el)}
            style={{
              position: 'absolute',
              width: '100%',
              fontWeight: 'bold',
              opacity: 0,
              left: 0,
              whiteSpace: 'nowrap',
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
            }}
          >
            {index === 0 ? item.text : ''}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Hello
