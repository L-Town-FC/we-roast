import React from "react"
import { Link, graphql } from "gatsby"
import SEO from "../components/seo"
import Img from "gatsby-image"
import { Card, Space } from "antd"
import BlogPreview from "../components/blogPreview"

export default ({ data }) => {
    const user = data.contentfulPerson
    const contentfulId = data.contentfulPerson.contentful_id
    const siteTitle = data.site.siteMetadata.title
    const blogs = data.allContentfulBlogPost.edges

    return (
        <Space direction="vertical">
            <SEO
                title={`${user.username} | ${siteTitle}`}
                description={`${user.username} | ${siteTitle}`}
            />
                <Space>
                    <Img alt={user.username} fluid={user.image.fluid} />
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
                {blogs.map(({ node }) => (
                    <Link to={`/blog/${node.slug}`}>
                        <Card hoverable="true" key={node.title}>
                            <BlogPreview article={node} />
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
            contentful_id
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
            filter: { author: { username: { eq: $username } } }
        ) {
            edges {
                node {
                    title
                    slug
                    publishDate(formatString: "MMMM Do, YYYY")
                    tags {
                        slug
                        title
                    }
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
