import React from "react"
import SEO from "../components/seo"
import { Card, Space } from "antd"
import { useAuth0 } from "../services/auth.service"
import BlogForm from "../components/blogForm"
import { ProtectedRoute } from "../components/protectedRoute"
import LoadingPour from "../components/loadingPour"

const WriteBlog = () => {
    const { loading, user, isAuthenticated, logout } = useAuth0()

    if (loading || !user) {
        return <LoadingPour />
    }
    return (
        <ProtectedRoute>
            <Space direction="vertical">
                <SEO title="Write Blog" />
                <br />
                <h2 style={{ color: "var(--titleNormal)" }}>
                    Write something new!
                </h2>
                <BlogForm />
                <img
                    src="https://source.unsplash.com/featured/?coffee"
                    alt="randomCoffee"
                />
            </Space>
        </ProtectedRoute>
    )
}

export default WriteBlog
