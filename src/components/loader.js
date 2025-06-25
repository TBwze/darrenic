import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'
import anime from 'animejs'
import styled from 'styled-components'

const StyledLoader = styled.div`
  ${({ theme }) => theme.mixins.flexCenter};
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: var(--dark-navy);
  z-index: 99;

  .logo-wrapper {
    width: 306px;
    height: 306px;
    transition: var(--transition);
    opacity: ${(props) => (props.isMounted ? 1 : 0)};

    svg {
      display: block;
      width: 100%;
      height: 100%;
      margin: 0 auto;
      user-select: none;

      path {
        fill: #e1efff;
        stroke: black;
        stroke-width: 6;
      }
    }
  }
`

const Loader = ({ finishLoading }) => {
  const [isMounted, setIsMounted] = useState(false)

  const animate = () => {
    const sixthTL = anime.timeline({
      loop: false,
      easing: 'easeInOutSine',
      duration: 2000,
      complete: () => finishLoading()
    })

    sixthTL
      .add({
        targets: '.sixth-rect1',
        translateY: 54,
        duration: 500
      })
      .add(
        {
          targets: '.sixth-rect2',
          translateX: -54,
          duration: 500
        },
        0
      )
      .add(
        {
          targets: '.sixth-rect3',
          translateY: -54,
          duration: 500
        },
        0
      )
      .add(
        {
          targets: '.sixth-rect4',
          translateX: 54,
          duration: 500,
          endDelay: 200
        },
        0
      )
      .add({
        targets: '#sixthSVG',
        duration: 500,
        rotate: 135,
        endDelay: 200
      })
      .add({
        targets: '.sixth-rect2',
        translateX: 0,
        duration: 500
      })
      .add(
        {
          targets: '.sixth-rect4',
          translateX: 0,
          duration: 500,
          endDelay: 200
        },
        '-=500'
      )
      .add({
        targets: '.sixth-rect1',
        translateY: 0,
        duration: 500
      })
      .add(
        {
          targets: '.sixth-rect4',
          translateX: 54,
          duration: 500
        },
        '-=500'
      )
      .add(
        {
          targets: '.sixth-rect3',
          translateY: 0,
          duration: 500
        },
        '-=500'
      )
      .add(
        {
          targets: '.sixth-rect2',
          translateX: -54,
          duration: 500,
          endDelay: 200
        },
        '-=500'
      )
      .add({
        targets: '.sixth-rect1',
        translateY: 54,
        duration: 500
      })
      .add(
        {
          targets: '.sixth-rect3',
          translateY: -54,
          duration: 500,
          endDelay: 200
        },
        '-=500'
      )
      .add({
        targets: '#sixthSVG',
        duration: 500,
        rotate: 270,
        endDelay: 200
      })
      .add({
        targets: '.sixth-rect1',
        translateY: 0,
        duration: 500
      })
      .add(
        {
          targets: '.sixth-rect2',
          translateX: 0,
          duration: 500
        },
        '-=500'
      )
      .add(
        {
          targets: '.sixth-rect3',
          translateY: 0,
          duration: 500
        },
        '-=500'
      )
      .add(
        {
          targets: '.sixth-rect4',
          translateX: 0,
          duration: 500,
          endDelay: 200
        },
        '-=500'
      )
      .add({
        targets: '.loader',
        duration: 200,
        easing: 'easeInOutQuart',
        opacity: 0,
        zIndex: -1
      })
  }

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 10)
    animate()
    return () => clearTimeout(timeout)
  }, [])

  return (
    <StyledLoader className="loader" isMounted={isMounted}>
      <Helmet bodyAttributes={{ class: 'hidden' }} />

      <div className="logo-wrapper">
        <svg
          id="sixthSVG"
          width="306"
          height="306"
          viewBox="0 0 306 306"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="sixth-rect1"
            d="M190.032 87.9865L218.032 87.9865V162.987H190.032V87.9865Z"
          />
          <path
            className="sixth-rect2"
            d="M218.698 189.191V217.191H143.698V189.191H218.698Z"
          />
          <path
            className="sixth-rect3"
            d="M88.0325 142.987L116.032 142.987L116.032 217.987H88.0325L88.0325 142.987Z"
          />
          <path
            className="sixth-rect4"
            d="M163.032 87.9865V115.987L88.0325 115.987L88.0325 87.9865L163.032 87.9865Z"
          />
        </svg>
      </div>
    </StyledLoader>
  )
}

export default Loader

Loader.propTypes = {
  finishLoading: PropTypes.func.isRequired
}
