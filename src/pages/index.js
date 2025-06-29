import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  Layout,
  Hero,
  About,
  Experience,
  Contact,
  Featured,
  Projects
} from '@components'

const StyledMainContainer = styled.main`
  counter-reset: section;
`

const IndexPage = ({ location }) => {
  return (
    <Layout location={location}>
      <StyledMainContainer className="fillHeight">
        <Hero />
        <About />
        <Experience />
        <Featured />
        <Projects />
        <Contact />
      </StyledMainContainer>
    </Layout>
  )
}

IndexPage.propTypes = {
  location: PropTypes.object.isRequired
}

export default IndexPage
