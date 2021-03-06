import React from "react"
import { Link, graphql } from "gatsby"
import SEO from "../components/seo"
import Img from "gatsby-image"
import { Card } from "antd"
import UserPreview from "../components/userPreview"

export default ({ data }) => {
    const post = data.contentfulBlogPost
    const contentfulId = data.contentfulBlogPost.contentful_id
    const siteTitle = data.site.siteMetadata.title

    return (
        <>
            <SEO
                title={`${post.title} | ${siteTitle}`}
                description={`${post.title} | ${siteTitle}`}
            />
            <div style={{ padding: 15 }}>
                <Img alt={post.title} fluid={post.heroImage.fluid} imgStyle={{maxHeight:"80%"}}/>
                <br />
                <Card>
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
                    <Link to={`/user/${post.author.username}`}>
                        <UserPreview user={post.author} />
                    </Link>

                    <br />
                    {post.body && <div
                        dangerouslySetInnerHTML={{
                            __html: post.body.childMarkdownRemark.html,
                        }}
                    />}
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
            contentful_id
            title
            publishDate(formatString: "MMMM Do, YYYY")
            author {
                name
                username
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
