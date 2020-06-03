import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import { Avatar, Card, Space } from "antd"

export default ({ user }) => (
    <Space>
        <Card hoverable title={user.username}>
            <div
                style={{
                    display: "flex",
                    padding: "15",
                    alignContent: "center",
                }}
            >
                <Avatar size="large" src={user.image.fluid.src} />
                <h3> {user.name}</h3>
            </div>
        </Card>
    </Space>
)
