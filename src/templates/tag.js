import React from "react"
import sortBy from "lodash/sortBy"
import { Link, graphql } from "gatsby"
import SeoWrapper from "../components/seo"
import { Card, Space } from "antd"
import BlogPreview from "../components/blogPreview"

const TagTemplate = ({ data }) => {
    const siteTitle = data.site.siteMetadata.title
    const { title } = data.contentfulTag

    const blogs = sortBy(data.contentfulTag.blog_post, "publishDate").reverse()

    return (
        <Space direction="vertical">
            <SeoWrapper
                title={`${title} | ${siteTitle}`}
                description={`${title} | ${siteTitle}`}
            />
            <Space>
                <Card>
                    <h1 style={{ color: "var(--titleNormal)" }}>{title}</h1>
                    <br />
                </Card>
            </Space>
            <br />
            <h2 style={{ color: "var(--titleNormal)" }}>Blogs</h2>
            {blogs.map( blog => (
                <Link to={`/blog/${blog.slug}`}>
                    <Card hoverable="true">
                        <BlogPreview article={blog} />
                    </Card>
                    <br />
                </Link>
            ))}
        </Space>
    )
}

export const query = graphql`
    query tagQuery($slug: String!) {
        site {
            siteMetadata {
                title
            }
        }
        contentfulTag(slug: { eq: $slug }) {
            title
            id
            slug
            blog_post {
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
`

export default TagTemplate
