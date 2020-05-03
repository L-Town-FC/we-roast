import React from "react"
import { getProfile, logout } from "../services/auth"
import SEO from "./seo"
import { Button, Card } from "antd"
import { LogoutOutlined } from "@ant-design/icons"

const Profile = () => (
    <div>
        <SEO title="Profile" />
        <Card title="Profile" hoverable="true">
            <img src={getProfile().picture} alt="profilePicture" />
            <ul>
                <li>Name: {getProfile().name}</li>
                <li>Nickname: {getProfile().nickname}</li>
                <li>E-mail: {getProfile().email}</li>
            </ul>
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
        </Card>
        <img
            src="https://source.unsplash.com/featured/?coffee"
            alt="randomCoffee"
        />
    </div>
)

export default Profile
