import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image"

const Blog = () => {
  const data = useStaticQuery(graphql`
  query BlogImages{
    images: allFile(filter: {relativeDirectory: {eq: "brew"}}){
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
    <Layout>
      <SEO title="Blog" />
      <h1>Blog Page</h1>
      <div className="beans-gallary">
        {data.images.nodes.map(image  => (<Img fluid={image.childImageSharp.fluid}/>))}
      </div>
    </Layout>
  )
}

export default Blog
