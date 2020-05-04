import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import styled from 'styled-components'
 
import BackgroundImage from 'gatsby-background-image'
import { StyledFullScreenWrapper } from './SharedStyledComponents'

/**
 * In this functional component a fullscreen <BackgroundImage />  is created.
 * @param className   string    className(s) from styled-components.
 * @param children    nodes     Child-components.
 * @return {*}
 * @constructor
 */
const FullBackground = ({ className, children }) => {
    const { desktop } = useStaticQuery(
      graphql`
        query {
          desktop: file(relativePath: { eq: "beans/rodrigo-flores.jpg" }) {
            childImageSharp {
              fluid(quality: 90, maxWidth: 4160) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
          }
        }
      `
    )
  
    // Single Image Data
    const imageData = desktop.childImageSharp.fluid
  
    return (
      <StyledFullScreenWrapper>
        <BackgroundImage
          Tag="section"
          className={className}
          fluid={imageData}
          backgroundColor={`#040e18`}
          title="Fullscreen Background"
          id="fullscreenbg"
          role="img"
          aria-label="Fullscreen Background"
          preserveStackingContext={true}
        >
          {children}
        </BackgroundImage>
      </StyledFullScreenWrapper>
    )
  } 

 
const StyledBackgroundSection = styled(FullBackground)`
  width: 100%;
  background-position: bottom center;
  background-repeat: repeat-y;
  background-size: cover;
`
 
export default StyledBackgroundSection