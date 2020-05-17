import React from "react"
import { Button, Card, Space } from "antd"
import SEO from "../components/seo"
import { useAuth0 } from "../services/auth.API"
import { LogoutOutlined } from "@ant-design/icons"
import { ProtectedRoute } from "../components/protected-route"
import { Navigatioin, Navigation } from "../components/navigation"

const Account = () => {
    const { user, logout } = useAuth0()
    console.log(user)

    return (
        <ProtectedRoute>
            <Space direction="vertical">
                <SEO title="Profile" />
                <br />
                <Card title="Account Profile" hoverable="true">
                    <Space>
                        <img
                            style={{ borderRadius: "50%" }}
                            src={JSON.stringify(user, null, 2).picture}
                            alt="profilePicture"
                        />
                        <ul>
                            <li>Name: {JSON.stringify(user, null, 2).given_name}</li>
                            <li>Nickname: {JSON.stringify(user, null, 2).nickname}</li>
                            <li>E-mail: {JSON.stringify(user, null, 2).email}</li>
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
            <p>Check out the user data supplied by Auth0, below:</p>
            <pre>{JSON.stringify(user, null, 2)}</pre>
        </ProtectedRoute>
    )
}

export default Account
