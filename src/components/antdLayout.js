import React from "react"
import { Layout } from "antd"
import { Navigation } from "./navigation"
import { useStaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"

const { Header, Content, Footer } = Layout

const AntdLayout = ({ children }) => {
    const data = useStaticQuery(graphql`
        query SiteQuery {
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
        <Layout className="layout">
            <Header>
                {/* <div className="logo" /> */}
                <Navigation
                    menuLinks={data.site.siteMetadata.menuLinks}
                    siteTitle={data.site.siteMetadata.title}
                    currentKey="premium coffee"
                />
            </Header>
            <Content>
                <div>{children}</div>
            </Content>
            <Footer style={{ textAlign: "center" }}>
                Created by Mollo
            </Footer>
        </Layout>
    )
}

AntdLayout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default AntdLayout
