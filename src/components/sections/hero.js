import React, { useState, useEffect } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import styled from 'styled-components'
import { navDelay, loaderDelay } from '@utils'
import { usePrefersReducedMotion } from '@hooks'

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: 0;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 5px;
    color: var(--slate);
    line-height: 0.9;
    font-size: 3em;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false)

  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsMounted(true)
      return // Explicit return for no cleanup needed
    }

    console.log('Setting mount timeout')
    const timeout = setTimeout(() => {
      console.log('Timeout completed, mounting content')
      setIsMounted(true)
    }, navDelay)

    // Proper cleanup function
    return () => {
      console.log('Cleanup: clearing timeout')
      clearTimeout(timeout)
    }
  }, [prefersReducedMotion])

  console.log(
    `Hero render - isMounted: ${isMounted}, prefersReducedMotion: ${prefersReducedMotion}`
  )

  const one = <h2 className="big-heading">Darren Iskandar Cahyadi</h2>
  const two = <h3 className="big-heading">Software Engineer</h3>
  const three = (
    <>
      <p>
        Computer science graduate, passionate about building scalable,
        efficient, and user-friendly websites and applications. Welcome to my
        portfolio.
      </p>
    </>
  )

  const items = [one, two, three]

  return (
    <StyledHeroSection>
      {prefersReducedMotion
        ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
          )
        : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
          )}
    </StyledHeroSection>
  )
}

export default Hero
