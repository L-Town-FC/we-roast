import React from "react"
import { handleAuthentication } from "../services/auth"
import { Space, Spin } from "antd"

const Callback = () => {
    handleAuthentication()

    return (
        <Space align="center">
            <p>...Loading...</p>
            <Spin />
        </Space>
    )
}

export default Callback
