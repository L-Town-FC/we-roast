/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import NavBar from "./navbar"
import Background from "./Background"
import { InstagramFilled } from "@ant-design/icons"
import { Avatar, Button, Card } from "antd"
import { isBrowser } from "../services/auth"

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
            <NavBar
                menuLinks={data.site.siteMetadata.menuLinks}
                siteTitle={data.site.siteMetadata.title}
                currentKey="premium coffee"
                theme="light"
            />
            <div
                style={{
                    margin: `0 auto`,
                    maxWidth: 960,
                    padding: `0 1.0875rem 1.45rem`,
                }}
            >
                <main>{children}</main>
                <br />
                <footer>
                    <Card>
                        <div style={{ display: `flex` }}>
                            <p>Created by{" "}
                            <a href="https://github.com/atmollohan">Mollo</a>
                            {" "}Built with{" "}
                            <a href="https://www.gatsbyjs.org"> Gatsby</a> and{" "}
                            <a href="https://3x.ant.design/"> Ant Design</a>
                            </p>
                            <br />
                        </div>
                    </Card>
                    <br />
                    <a href="https://www.instagram.com/weroast.coffee/">
                        <Avatar
                            href="https://www.instagram.com/weroast.coffee/"
                            icon={<InstagramFilled />}
                        />
                    </a>
                </footer>
            </div>
        </div>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout
