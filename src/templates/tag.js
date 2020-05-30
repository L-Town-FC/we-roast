import React from "react"
import sortBy from 'lodash/sortBy'
import { Link, graphql } from "gatsby"
import SEO from "../components/seo"
import Img from "gatsby-image"
import { Card, Space } from "antd"

const TagTemplate = ({ data }) => {
    const siteTitle = data.site.siteMetadata.title
    const { title, slug } = data.contentfulTag

    const posts = sortBy(data.contentfulTag.post, "publishDate").reverse()

    return (
        <Space direction="vertical">
            <SEO
                title={`${title} | ${siteTitle}`}
                description={`${title} | ${siteTitle}`}
            />
            <Space>
                <Card hoverable="true">
                    <h1 style={{ color: "var(--titleNormal)" }}>{title}</h1>
                    <br />
                </Card>
            </Space>
            <br />
            <h2 style={{ color: "var(--titleNormal)" }}>Posts</h2>
            {/* {posts.map(({ node }) => (
                    <Link to={`/blog/${node.slug}`}>
                        <Card hoverable="true" key={node.title}>
                            <ArticlePreview article={node} />
                        </Card>
                        <br />
                    </Link>
                ))} */}
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
            post {
                id
                title
                slug
                publishDate(formatString: "MMMM DD, YYYY")
                heroImage {
                    title
                    sizes(maxWidth: 1800) {
                        ...GatsbyContentfulSizes_withWebp_noBase64
                    }
                }
                body {
                    childMarkdownRemark {
                        html
                        excerpt(pruneLength: 80)
                    }
                }
            }
        }
    }
`

export default TagTemplate
