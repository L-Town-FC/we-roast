import React from "react"
import { useAuth0 } from "../services/auth.service"
import SEO from "../components/seo"
import { Card, Space } from "antd"
// import "../styles/global.css"
import LoadingPour from "../components/loadingPour"

const IndexPage = ({ data }) => {
    const { loading, user, isAuthenticated } = useAuth0()
    if (loading) {
        return (
            <LoadingPour />
        )
    }

    return (
        <Space direction="vertical">
            <SEO title="Home" />
            <h3 style={{ color: "var(--titleNormal)" }}>
                Hello {isAuthenticated ? user.given_name : "world"}!
            </h3>

            <Card hoverable>
                At <b>WE</b> ROAST, <b>we</b> enjoy the highest quality coffee,
                sourced from around the world!
            </Card>
            <Card hoverable>
                Coffee is the fuel <b>we</b> need to start the day early and it
                carries us over the finish line when it is late. Coffee means
                something different to everyone and those stories are important!
            </Card>
            <div>
                <img
                    src="https://source.unsplash.com/featured/?coffee"
                    alt="randomCoffee"
                />
            </div>
        </Space>
    )
}

export default IndexPage
