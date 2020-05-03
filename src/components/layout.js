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
import { InstagramFilled } from "@ant-design/icons"
import { Button } from "antd"
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
        <div>
            <NavBar
                menuLinks={data.site.siteMetadata.menuLinks}
                siteTitle={data.site.siteMetadata.title}
                currentKey="premium coffee"
            />
            <div
                style={{
                    margin: `0 auto`,
                    maxWidth: 960,
                    padding: `0 1.0875rem 1.45rem`,
                }}
            >
                <main>{children}</main>
                <footer>
                    Created by Mollo LLC © {new Date().getFullYear()}, Built
                    with
                    {` `}
                    <a href="https://www.gatsbyjs.org">Gatsby</a>
                    {` `}
                    and
                    <a href="https://3x.ant.design/">Ant Design</a>
                    <br />
                    <Button
                        href="https://www.instagram.com/weroast.coffee/"
                        type="primary"
                        icon={<InstagramFilled />}
                        shape="round"
                        size="large"
                    />
                </footer>
            </div>
        </div>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout
