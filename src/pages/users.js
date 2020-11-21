import React from "react"
import { Link, graphql, useStaticQuery, navigate } from "gatsby"
import SEO from "../components/seo"
import { Button, Card, Space } from "antd"
import UserPreview from "../components/userPreview"
import { useAuth0 } from "../services/auth.service"

const Users = () => {
    const data = useStaticQuery(graphql`
        query allUsers {
            site {
                siteMetadata {
                    title
                }
            }
            allContentfulPerson {
                edges {
                    node {
                        title
                        username
                        createdAt(formatString: "MMMM Do, YYYY")
                        image {
                            fluid {
                                src
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
                }
            }
        }
    `)
    const siteTitle = data.site.siteMetadata.title
    const users = data.allContentfulPerson.edges
    return (
        <>
            <SEO title={siteTitle} />

            <div style={{ padding: 10 }}>
                <h2 style={{ color: "var(--titleNormal)" }}>Users</h2>
                {users.map(({ node }) => (
                    <Space>
                        <Link key={node.username} to={`/user/${node.username}`}>
                            <UserPreview user={node} />
                        </Link>
                    </Space>
                ))}
            </div>
        </>
    )
}

export default Users
