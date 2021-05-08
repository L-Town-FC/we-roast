import React from "react"
import SEO from "../components/seo"
import { Space } from "antd"
import { useAuth0 } from "../services/auth.service"
import { ProtectedRoute } from "../components/protectedRoute"
import LoadingPour from "../components/loadingPour"

const EditUser = () => {
    const { loading, user } = useAuth0()

    if (loading || !user) {
        return <LoadingPour />
    }
    return (
        <ProtectedRoute>
            <Space direction="vertical">
                <SEO title="Edit Blog" />
                <br />
                <h2 style={{ color: "var(--titleNormal)" }}>
                    Edit User
                </h2>
                <img
                    src="https://source.unsplash.com/featured/?coffee"
                    alt="randomCoffee"
                />
            </Space>
        </ProtectedRoute>
    )
}

export default EditUser;
