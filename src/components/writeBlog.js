import React from "react"
import { getProfile, logout } from "../services/auth"
import SEO from "./seo"
import { Button, Card, Space } from "antd"
import { LogoutOutlined } from "@ant-design/icons"
import NewBlogForm from "./newBlogForm"

const WriteBlog = () => (
    <Space direction="vertical">
        <SEO title="Write Blog" />
        <br />
        <h2 style={{ color: "var(--titleNormal)" }}>Write something new!</h2>
        <Card title="Your user info:" hoverable="true">
            <Space>
                <ul>
                    <li>Name: {getProfile().name}</li>
                    <li>Nickname: {getProfile().nickname}</li>
                    <li>E-mail: {getProfile().email}</li>
                </ul>
            </Space>
        </Card>
        <NewBlogForm />
        <img
            src="https://source.unsplash.com/featured/?coffee"
            alt="randomCoffee"
        />
    </Space>
)

export default WriteBlog
