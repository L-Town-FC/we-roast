import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import { css } from "@emotion/core"
import { rhythm } from "../utils/typography"
import SEO from "../components/seo"
import Img from "gatsby-image"
import { Card } from "antd"

const Blog = () => {
    const data = useStaticQuery(graphql`
        query BlogImages {
            images: allFile(filter: { relativeDirectory: { eq: "brew" } }) {
                nodes {
                    id
                    childImageSharp {
                        fixed(width: 200) {
                            ...GatsbyImageSharpFixed
                        }
                        fluid {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
            blogs: allMarkdownRemark(
                sort: { fields: [frontmatter___date], order: DESC }
            ) {
                totalCount
                edges {
                    node {
                        id
                        frontmatter {
                            title
                            date(formatString: "DD MMMM, YYYY")
                        }
                        fields {
                            slug
                        }
                        excerpt
                    }
                }
            }
        }
    `)
    return (
        <>
            <SEO title="Blog" />
            <h4>{data.blogs.totalCount} Posts</h4>
            {data.blogs.edges.map(({ node }) => (
                <>
                    <Card
                        title={node.frontmatter.title}
                        hoverable="true"
                        key={node.id}
                    >
                        <Link
                            to={node.fields.slug}
                            css={css`
                                text-decoration: none;
                                color: inherit;
                            `}
                        >
                            <h3
                                css={css`
                                    margin-bottom: ${rhythm(1 / 4)};
                                `}
                            >
                                {node.frontmatter.title}{" "}
                                <span
                                    css={css`
                                        color: #bbb;
                                    `}
                                >
                                    - {node.frontmatter.date}
                                </span>
                            </h3>
                            <p>{node.excerpt}</p>
                        </Link>
                    </Card>
                    <br />
                </>
            ))}
            <div className="beans-gallary">
                {data.images.nodes.map(image => (
                    <Img fluid={image.childImageSharp.fluid} />
                ))}
            </div>
        </>
    )
}

export default Blog
