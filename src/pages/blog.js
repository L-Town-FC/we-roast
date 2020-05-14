import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import SEO from "../components/seo"
import { Button, Card } from "antd"
import ArticlePreview from "../components/article-preview"
import { getProfile } from "../services/auth"
import { uploadFile } from "../services/contentful.API"

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
                {getProfile() ? (
                    <div>
                        <Button onClick={e => console.log(e)}>Write something new</Button>
                    </div>
                ) : (
                    <></>
                )}
                <h2 style={{ color: "var(--titleNormal)" }}>Recent articles</h2>
                {posts.map(({ node }) => (
                    <Link key={node.slug} to={`/blog/${node.slug}`}>
                        <Card hoverable="true" key={node.title}>
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
