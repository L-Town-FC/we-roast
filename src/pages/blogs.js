import React from "react"
import { Link, graphql, useStaticQuery, navigate } from "gatsby"
import SEO from "../components/seo"
import { Button, Card } from "antd"
import BlogPreview from "../components/blogPreview"
import { useAuth0 } from "../services/auth.API"

const Blogs = () => {
    const data = useStaticQuery(graphql`
        query allBlogs {
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
    `)
    const siteTitle = data.site.siteMetadata.title
    const blogs = data.allContentfulBlogPost.edges
    const { loading, user, isAuthenticated } = useAuth0()
    if (loading) {
        return <p>Loading...</p>
    }
    return (
        <>
            <SEO title={siteTitle} />

            <div style={{padding:10}}>
                {isAuthenticated ? (
                    <div>
                        <Button onClick={e => navigate("/writeBlog")}>
                            Write something new
                        </Button>
                    </div>
                ) : (
                    <></>
                )}
                <h2 style={{ color: "var(--titleNormal)" }}>Recent articles</h2>
                {blogs.map(({ node }) => (
                    <Link key={node.slug} to={`/blog/${node.slug}`}>
                        <Card hoverable="true" key={node.title}>
                            <BlogPreview article={node} />
                        </Card>
                        <br />
                    </Link>
                ))}
            </div>
        </>
    )
}

export default Blogs
