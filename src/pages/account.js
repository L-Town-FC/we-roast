import React from "react"
import { Button, Card, Space } from "antd"
import SEO from "../components/seo"
import { useAuth0 } from "../services/auth.API"
import { LogoutOutlined } from "@ant-design/icons"
import { ProtectedRoute } from "../components/protected-route"
import { Navigatioin, Navigation } from "../components/navigation"

const Account = () => {
    const { loading, user, isAuthenticated, logout } = useAuth0()

    if (loading || !user) {
        return <p>Loading Account Profile...</p>
    }

    return (
        <ProtectedRoute>
            <Space direction="vertical">
                <SEO title="Profile" />
                <br />
                <Card title="Account Profile" hoverable="true">
                    <Space>
                        <img
                            style={{ borderRadius: "50%" }}
                            src={user.picture}
                            alt="profilePicture"
                        />
                        <ul>
                            <li>
                                Name: {user.given_name}
                            </li>
                            <li>
                                Nickname:{" "}
                                {user.nickname}
                            </li>
                            <li>
                                E-mail: {user.email}
                            </li>
                            <li>
                                <Button
                                    icon={<LogoutOutlined />}
                                    type="primary"
                                    onClick={e => {
                                        logout()
                                        e.preventDefault()
                                    }}
                                >
                                    Loggout
                                </Button>
                            </li>
                        </ul>
                    </Space>
                </Card>
                <img
                    src="https://source.unsplash.com/featured/?coffee"
                    alt="randomCoffee"
                />
            </Space>
        </ProtectedRoute>
    )
}

export default Account
