import React from "react"
import { graphql } from "gatsby"
import SEO from "../components/seo"
import Img from "gatsby-image"

export default ({ data }) => {
    const post = data.markdownRemark
    const featuredImgFluid = post.frontmatter.featuredImage.childImageSharp.fluid
    return (
        <>
            <SEO title={post.frontmatter.title} description={post.excerpt} />
            <div style={{padding: 15}}>
                <Img fluid={featuredImgFluid} style={{padding:10}}/>
                <h1 style={{ color: "var(--titleNormal)" }}>{post.frontmatter.title}</h1>
                <h2 style={{ color: "var(--titleNormal)" }}>Author: {post.frontmatter.author}</h2>
                <div dangerouslySetInnerHTML={{ __html: post.html }} />
            </div>
        </>
    )
}

export const query = graphql`
    query($slug: String!) {
        markdownRemark(fields: { slug: { eq: $slug } }) {
            html
            frontmatter {
                author
                title
                featuredImage {
                    childImageSharp {
                        fluid(maxWidth: 800) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
            excerpt
        }
    }
`
