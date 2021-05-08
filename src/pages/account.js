import React, { useEffect, useState } from "react"
import { Card, Input, Space } from "antd"
// import "../../src/styles/global.css"
import SEO from "../components/seo"
import { useAuth0 } from "../services/auth.service"
import { EditOutlined, LogoutOutlined } from "@ant-design/icons"
import { ProtectedRoute } from "../components/protectedRoute"
import { getUserByEmail } from "../services/contentful.service"
import LoadingPour from "../components/loadingPour"

const Account = () => {
    const { loading, user, logout, getTokenSilently } = useAuth0()
    const [contentfulUser, setContentfulUser] = useState(null)
    const [isEditing, setIsEditing] = useState(false)
    useEffect(() => {
        ;(async () => {
            if(user){
                const token = await getTokenSilently()
                const userEntry = await getUserByEmail(user.email, token)
                // const userEntry = await getUserByEmail("bademail@gmail.com", token)
                setContentfulUser(userEntry)
            }
        })()
    }, [user])

    if (loading || !user || !contentfulUser) {
        return <LoadingPour />
    }

    return (
        <ProtectedRoute>
            <Space direction="vertical">
                <SEO title="Profile" />
                <br />
                <Card 
                    title="Account Settings"
                    hoverable="true"
                    loading={loading}
                    actions={[
                        <EditOutlined
                            onClick={() => {
                                setIsEditing(!isEditing)
                                // navigate("/editUser")
                            }}
                        />,
                        <LogoutOutlined
                            onClick={e => {
                                logout()
                                e.preventDefault()
                            }}
                        />
                ]} 
                >
                    <Space>
                        <img
                            style={{ borderRadius: "50%" }}
                            src={contentfulUser.fields.image.fields.file.url}
                            srcset={contentfulUser.fields.image.fields.url}
                            type={contentfulUser.fields.image.fields.file.contentType}
                            alt="contentfulPicture"
                        />
                        
                        <ul>
                            {/* <li>Name: {contentfulUser.fields.name}</li> */}
                            <li className="row-container">username: {isEditing ? <Input defaultValue={contentfulUser.fields.username} /> : contentfulUser.fields.username}</li>
                            <li className="row-container">email: {isEditing ? <Input defaultValue={contentfulUser.fields.email} /> : contentfulUser.fields.email}</li>
                        </ul>
                    </Space>
                    <Space direction="vertical">
                        <h1>{isEditing ? <Input defaultValue={contentfulUser.fields.title} /> : contentfulUser.fields.title}</h1>
                        <h2>{isEditing ? <Input defaultValue={contentfulUser.fields.shortBio} /> : contentfulUser.fields.shortBio}</h2>
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
