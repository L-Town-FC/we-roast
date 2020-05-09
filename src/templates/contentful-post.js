import React from "react"
import { graphql } from "gatsby"
import SEO from "../components/seo"
import Img from "gatsby-image"
import { Card } from "antd"

export default ({ data }) => {
    const post = data.contentfulBlogPost
    const siteTitle = data.site.siteMetadata.title

    return (
        <>
            <SEO
                title={`${post.title} | ${siteTitle}`}
                description={`${post.title} | ${siteTitle}`}
            />
            <div style={{ padding: 15 }}>
                <Img alt={post.title} fluid={post.heroImage.fluid} />
                <br />
                <Card hoverable="true">
                    <h1 style={{ color: "var(--titleNormal)" }}>
                        {post.title}
                    </h1>
                    <p
                        style={{
                            display: "block",
                        }}
                    >
                        Published: {post.publishDate}
                    </p>
                    <p>Author: {post.author.name}</p>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: post.body.childMarkdownRemark.html,
                        }}
                    />
                </Card>
            </div>
        </>
    )
}

export const query = graphql`
    query BlogPostBySlug($slug: String!) {
        site {
            siteMetadata {
                title
            }
        }
        contentfulBlogPost(slug: { eq: $slug }) {
            title
            publishDate(formatString: "MMMM Do, YYYY")
            author {
                name
                image {
                    fluid {
                        src
                    }
                }
            }
            heroImage {
                fluid(maxWidth: 1180, background: "rgb:000000") {
                    ...GatsbyContentfulFluid_tracedSVG
                }
            }
            body {
                childMarkdownRemark {
                    html
                }
            }
        }
    }
`
