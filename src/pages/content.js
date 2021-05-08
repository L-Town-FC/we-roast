import React from "react"
import { Space } from "antd"
import SEO from "../components/seo"
import TagList from "../components/tagList"

const Content = () => {
    return (
        <Space direction="vertical">
            <SEO title="Content" />
            <h1 style={{ color: "var(--titleNormal)" }}>Content Page</h1>
            <TagList />
            <br />
            <div>
                <img
                    src="https://source.unsplash.com/featured/?coffee"
                    alt="randomCoffee"
                />
            </div>
        </Space>
    )
}

export default Content
