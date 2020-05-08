import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import { css } from "@emotion/core"
import { rhythm } from "../utils/typography"
import SEO from "../components/seo"
import Img from "gatsby-image"
import { Card } from "antd"
import ArticlePreview from "../components/article-preview"

const Blogs = () => {
    const data = useStaticQuery(graphql`
        query BlogIndexQuery {
            site {
                siteMetadata {
                    title
                }
            }
            allContentfulBlogPost(
                sort: { fields: [publishDate], order: DESC }
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
    `)
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allContentfulBlogPost.edges
    return (
        <>
            <SEO title={siteTitle} />

            <div className="wrapper">
                <h2 className="section-headline">Recent articles</h2>
                {posts.map(({ node }) => (
                    <Link to={`/blog/${node.slug}`}>
                        <Card
                            title={node.title}
                            hoverable="true"
                            key={node.title}
                        >
                            <ArticlePreview article={node} />
                        </Card>
                        <br />
                    </Link>
                ))}
            </div>
        </>
    )
}

export default Blogs
