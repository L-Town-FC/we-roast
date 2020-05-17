import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import SEO from "../components/seo"
import Img from "gatsby-image"
import Background from "../components/Background"

const Content = () => {
  const data = useStaticQuery(graphql`
  query Images{
    images: allFile(filter: {relativeDirectory: {eq: "beans"}}){
      nodes{
        id
        childImageSharp{
          fixed(width: 200){
            ...GatsbyImageSharpFixed
          }
          fluid{
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
  `)
  return (
    <>
      <SEO title="Content" />
      <h1 style={{ color: "var(--titleNormal)" }}>Content Page</h1>
      <div className="beans-gallary">
        {data.images.nodes.map(image  => (<Img fluid={image.childImageSharp.fluid} key={image.id} />))}
      </div>
    </>
  )
}

export default Content
