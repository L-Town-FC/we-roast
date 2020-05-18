import React from "react"
import SEO from "../components/seo"
import { Card, Space } from "antd"
import { useAuth0 } from "../services/auth.API"
import NewBlogForm from "../components/newBlogForm"
import { ProtectedRoute } from "../components/protected-route"

const WriteBlog = () => {
    const { loading, user, isAuthenticated, logout } = useAuth0()

    if (loading || !user) {
        return <p>Loading new blog form...</p>
    }
    return (
        <ProtectedRoute>
            <Space direction="vertical">
                <SEO title="Write Blog" />
                <br />
                <h2 style={{ color: "var(--titleNormal)" }}>
                    Write something new!
                </h2>
                <Card title="Your user info:" hoverable="true">
                    <Space>
                        <ul>
                            <li>Name: {user.name}</li>
                            <li>Nickname: {user.nickname}</li>
                            <li>E-mail: {user.email}</li>
                        </ul>
                    </Space>
                </Card>
                <NewBlogForm />
                <img
                    src="https://source.unsplash.com/featured/?coffee"
                    alt="randomCoffee"
                />
            </Space>
        </ProtectedRoute>
    )
}

export default WriteBlog
