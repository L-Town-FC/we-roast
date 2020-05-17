import React, { useState } from "react"
import { Link, navigate } from "gatsby"
import { ThemeToggler } from "gatsby-plugin-dark-mode"
import { useAuth0 } from "../services/auth.API"
import { Button, Space, Menu, Switch } from "antd"
import { UserOutlined, CoffeeOutlined } from "@ant-design/icons"
import logo from "../../static/wr-logo.png"

export const Navigation = props => {
    const { isAuthenticated, loginWithRedirect, logout, loading } = useAuth0()

    const [currentTheme, setCurrentTheme] = useState(props.theme)
    const [currentKey, setCurrentKey] = useState(props.currentKey)
    console.log(currentKey)

    const handleClick = e => {
        setCurrentKey(e.key)
        navigate(e.key)
    }
    return (
        <Space direction="vertical">
            <Space align="center">
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <img src={logo} style={{ borderRadius: 0 }} alt="logo" />
                </div>
            </Space>
            <Space align="center">
                <Menu
                    theme={currentTheme}
                    onClick={handleClick}
                    selectedKeys={[currentKey]}
                    mode="horizontal"
                    style={{
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    {props.menuLinks.map(menuItem => (
                        <Menu.Item
                            key={menuItem.link}
                            icon={<CoffeeOutlined />}
                        >
                            {menuItem.name}
                        </Menu.Item>
                    ))}
                    {!isAuthenticated && !loading && (
                        <Menu.Item key="/account"
                            onClick={() =>
                                loginWithRedirect({
                                    appState: `${window.location.pathname}`,
                                })
                            }
                        >
                            Log in
                        </Menu.Item>
                    )}
                    {isAuthenticated && !loading && (
                        <Menu.Item key="/account" icon={<UserOutlined />}>
                            Profile
                        </Menu.Item>
                    )}
                    <ThemeToggler>
                        {({ theme, toggleTheme }) => {
                            // toggleTheme(localStorage.getItem("theme"))
                            localStorage.setItem("theme", theme)
                            return (
                                <Switch
                                    checked={theme === "dark"}
                                    onChange={e => {
                                        // changeTheme(theme)
                                        setCurrentTheme(
                                            theme === "dark" ? "light" : "dark"
                                        )
                                        toggleTheme(
                                            theme === "dark" ? "light" : "dark"
                                        )
                                    }}
                                    checkedChildren="dark"
                                    unCheckedChildren="light"
                                />
                            )
                        }}
                    </ThemeToggler>
                </Menu>
            </Space>
        </Space>
    )
}
