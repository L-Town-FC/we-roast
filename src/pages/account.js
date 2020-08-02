import React, { useEffect, useState } from "react"
import { Button, Card, Space, Spin } from "antd"
import "../../src/styles/global.css"
import SEO from "../components/seo"
import { useAuth0 } from "../services/auth.service"
import { LogoutOutlined } from "@ant-design/icons"
import { ProtectedRoute } from "../components/protectedRoute"
import { getEnryById } from "../services/contentful.service"

const Account = () => {
    const { loading, user, isAuthenticated, logout } = useAuth0()
    const [contentfulUser, setContentfulUser] = useState(null)
    useEffect(() => {
        ;(async () => {
            const userEntry = await getEnryById("24ibMbzD8mVXeKgVykfn6z")
            setContentfulUser(userEntry)
            console.log(userEntry)
        })()
    }, [])

    if (loading || !user || !contentfulUser) {
        return (
            <div className="flexCenter">
                <h2>...Loading Account Profile...</h2>
                <Spin size="large"/>
            </div>
        )
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
                            <li>Name: {contentfulUser.fields.name}</li>
                            <li>Nickname: {contentfulUser.fields.username}</li>
                            <li>E-mail: {contentfulUser.fields.email}</li>
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
                    <Space direction="vertical">
                        <h1>{contentfulUser.fields.title}</h1>
                        <h2>{contentfulUser.fields.shortBio}</h2>
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
