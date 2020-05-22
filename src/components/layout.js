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
import Background from "./Background"
import { InstagramFilled } from "@ant-design/icons"
import { Avatar, Button, Card } from "antd"

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
                    // margin: `0 auto`,
                    backgroundColor: "var(--bg)",
                    color: "var(--textNormal)",
                    // maxWidth: 1060,
                }}
            >
                <main style={{margin: `0 auto`, maxWidth:1060}}>{children}</main>
                <br />
                <footer style={{margin: `0 auto`, maxWidth:"50%"}}>
                    <Card>
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
                        <a href="https://www.instagram.com/weroast.coffee/">
                            <Avatar
                                shape="square"
                                href="https://www.instagram.com/weroast.coffee/"
                                src="https://instagram-brand.com/wp-content/uploads/2016/11/Instagram_AppIcon_Aug2017.png?w=300"
                            />
                        </a>
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
