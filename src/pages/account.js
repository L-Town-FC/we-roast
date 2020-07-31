import React, { useEffect, useState } from "react"
import { Button, Card, Space } from "antd"
import SEO from "../components/seo"
import { useAuth0 } from "../services/auth.service"
import { LogoutOutlined } from "@ant-design/icons"
import { ProtectedRoute } from "../components/protectedRoute"
import { getEnryById } from "../services/contentful.service"

const Account = () => {
    const { loading, user, isAuthenticated, logout } = useAuth0()
    const [contentfulUser, setContentfulUser] = useState({})
    useEffect(async () => {
        console.log(await getEnryById("24ibMbzD8mVXeKgVykfn6z"))
        console.log(user.email)
    }, [])

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
                            <li>Name: {user.given_name}</li>
                            <li>Nickname: {user.nickname}</li>
                            <li>E-mail: {user.email}</li>
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
                {/* <>{getEnryById("24ibMbzD8mVXeKgVykfn6z")}</> */}
                <img
                    src="https://source.unsplash.com/featured/?coffee"
                    alt="randomCoffee"
                />
            </Space>
        </ProtectedRoute>
    )
}

export default Account
