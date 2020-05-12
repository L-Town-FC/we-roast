import React from "react"
import { Link, graphql } from "gatsby"
import SEO from "../components/seo"
import Img from "gatsby-image"
import { Card, Space } from "antd"
import ArticlePreview from "../components/article-preview"

export default ({ data }) => {
    const user = data.contentfulPerson
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allContentfulBlogPost.edges

    return (
        <Space direction="vertical">
            <SEO
                title={`${user.title} | ${siteTitle}`}
                description={`${user.title} | ${siteTitle}`}
            />
                <Space>
                    <Img alt={user.username} fluid={user.image.fluid} style={{borderRadius:"50%"}} />
                    <Card hoverable="true">
                        <h1 style={{ color: "var(--titleNormal)" }}>
                            {user.name}
                        </h1>
                        <h2 style={{ color: "var(--titleNormal)" }}>
                            {user.username}
                        </h2>
                        <p
                            style={{
                                display: "block",
                            }}
                        >
                            Joined: {user.createdAt}
                        </p>
                        <br />
                        <div
                            dangerouslySetInnerHTML={{
                                __html: user.shortBio.childMarkdownRemark.html,
                            }}
                        />
                        <br />
                    </Card>
                </Space>
                <br />
                <h2 style={{ color: "var(--titleNormal)" }}>Blogs</h2>
                {posts.map(({ node }) => (
                    <Link to={`/blog/${node.slug}`}>
                        <Card hoverable="true" key={node.title}>
                            <ArticlePreview article={node} />
                        </Card>
                        <br />
                    </Link>
                ))}
        </Space>
    )
}

export const query = graphql`
    query PersonByUsername($username: String!) {
        site {
            siteMetadata {
                title
            }
        }
        contentfulPerson(username: { eq: $username }) {
            createdAt(formatString: "MMMM Do, YYYY")
            image {
                fluid {
                    src
                    ...GatsbyContentfulFluid_tracedSVG
                }
            }
            name
            username
            shortBio {
                childMarkdownRemark {
                    html
                }
            }
        }
        allContentfulBlogPost(
            filter: { author: { username: { eq: "ramzord" } } }
        ) {
            edges {
                node {
                    title
                    slug
                    publishDate(formatString: "MMMM Do, YYYY")
                    tags
                    heroImage {
                        fluid {
                            ...GatsbyContentfulFluid_tracedSVG
                        }
                    }
                    description {
                        childMarkdownRemark {
                            html
                        }
                    }
                }
            }
        }
    }
`
