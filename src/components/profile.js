import React from "react"
import { getProfile, logout } from "../services/auth"
import SEO from "./seo"
import { Button, Card } from "antd"
import { LogoutOutlined } from "@ant-design/icons"

const Profile = () => (
    <div>
        <SEO title="Profile" />
        <br />
        <Card title="Profile" hoverable="true">
            <div
                style={{
                    // position: "relative",
                    display: "flex",
                    padding: "15",
                }}
            >
                <img
                    style={{ borderRadius: "50%", height: "30%", width: "30%" }}
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
            </div>
        </Card>
        <img
            src="https://source.unsplash.com/featured/?coffee"
            alt="randomCoffee"
        />
    </div>
)

export default Profile
