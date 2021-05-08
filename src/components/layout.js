/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { Navigation } from "../components/navigation"
import { Card } from "antd"
import { InstagramOutlined } from "@ant-design/icons"

const Layout = ({ children }) => {
    const data = useStaticQuery(graphql`
        query SiteTitleQuery {
            site {
                siteMetadata {
                    title
                    menuLinks {
                        name
                        link
                    }
                }
            }
        }
    `)

    return (
        <div
            style={{
                backgroundColor: "var(--bg)",
                color: "var(--textNormal)",
                padding: 10,
                transition: "color 0.2s ease-out, background 0.2s ease-out",
            }}
        >
            <Navigation
                menuLinks={data.site.siteMetadata.menuLinks}
                siteTitle={data.site.siteMetadata.title}
            />
            <div
                style={{
                    backgroundColor: "var(--bg)",
                    color: "var(--textNormal)",
                }}
            >
                <main style={{ margin: `0 auto`, maxWidth: 1260 }}>
                    {children}
                </main>
                <br />
                <footer style={{ margin: `0 auto`, maxWidth: "90%" }}>
                    <Card>
                        <a
                            href="https://www.instagram.com/weroastcoffeeco/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <InstagramOutlined />
                        </a>
                        <br />
                        <div style={{ display: `flex` }}>
                            <p>
                                Created by{" "}
                                <a href="https://github.com/atmollohan">
                                    Mollo
                                </a>
                                , built with{" "}
                                <a href="https://www.gatsbyjs.org"> Gatsby</a>{" "}
                                and{" "}
                                <a href="https://3x.ant.design/"> Ant Design</a>
                            </p>
                            <br />
                        </div>
                    </Card>
                </footer>
            </div>
        </div>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout
