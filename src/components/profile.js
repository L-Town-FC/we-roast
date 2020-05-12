import React from "react"
import { getProfile, logout } from "../services/auth"
import SEO from "./seo"
import { Button, Card, Space } from "antd"
import { LogoutOutlined } from "@ant-design/icons"

const Profile = () => (
    <Space direction="vertical">
        <SEO title="Profile" />
        <br />
        <Card title="Profile" hoverable="true">
            <Space>
                <img
                    style={{ borderRadius: "50%" }}
                    src={getProfile().picture}
                    alt="profilePicture"
                />
                <ul>
                    <li>Name: {getProfile().name}</li>
                    <li>Nickname: {getProfile().nickname}</li>
                    <li>E-mail: {getProfile().email}</li>
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
)

export default Profile
