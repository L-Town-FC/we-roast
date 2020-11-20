import React, { useEffect, useState } from "react"
import { graphql, useStaticQuery, navigate } from "gatsby"
import { Button, Card, Space } from "antd"
import "../../src/styles/global.css"
import SEO from "../components/seo"
import { useAuth0 } from "../services/auth.service"
import { EditOutlined, LogoutOutlined } from "@ant-design/icons"
import { ProtectedRoute } from "../components/protectedRoute"
import { getUserByEmail } from "../services/contentful.service"
import LoadingPour from "../components/loadingPour"

const Account = () => {
    const { loading, user, isAuthenticated, logout, getTokenSilently } = useAuth0()
    const [contentfulUser, setContentfulUser] = useState(null)
    useEffect(() => {
        ;(async () => {
            if(user){
                const token = await getTokenSilently()
                // const userEntry = await getUserByEmail(user.email, token)
                const userEntry = await getUserByEmail("bademail@gmail.com", token)
                setContentfulUser(userEntry)
            }
        })()
    }, [user, contentfulUser])

    if (loading || !user || !contentfulUser) {
        return <LoadingPour />
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
                            // src={contentfulUser.fields.image.fields.url}
                            src={user.picture}
                            alt="profilePicture"
                        />
                        
                        <ul>
                            <li>Name: {contentfulUser.fields.name}</li>
                            <li>Nickname: {contentfulUser.fields.username}</li>
                            <li>E-mail: {contentfulUser.fields.email}</li>
                            <li style={{ marginRight: "auto" }}>
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
                            <li>
                                <Button icon={<EditOutlined />} type="primary" onClick={()=>{navigate("/editUser")}}>
                                    Edit
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
