import React, { useState, useEffect } from "react"
import { Link, navigate } from "gatsby"
import { ThemeToggler } from "gatsby-plugin-dark-mode"
import { useAuth0 } from "../services/auth.service"
import { Affix, Button, Space, Menu, Switch } from "antd"
import {
    UserOutlined,
    CoffeeOutlined,
    EditOutlined,
    LogoutOutlined,
} from "@ant-design/icons"
import logo from "../../static/wr-logo.png"

export const Navigation = props => {
    const {
        isAuthenticated,
        loginWithRedirect,
        loginWithPopup,
        loading,
        logout,
    } = useAuth0()

    const [currentKey, setCurrentKey] = useState(
        localStorage.getItem("currentKey") || "/"
    )

    const handleClick = e => {
        if (e.key) {
            localStorage.setItem("currentKey", e.key)
            console.log(e.key)
            setCurrentKey(e.key)
            navigate(e.key)
        }
        else {
            navigate("/")
        }
    }
    return (
        <Affix>
            <Space
                direction="vertical"
                style={{ backgroundColor: "var(--bg)" }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        maxHeight: "10%",
                    }}
                >
                    <img
                        src={logo}
                        style={{
                            borderRadius: 0,
                            maxHeight: "20vh",
                        }}
                        alt="logo"
                    />
                </div>
                <Space align="center">
                    <ThemeToggler>
                        {({ theme, toggleTheme }) => {
                            localStorage.setItem("theme", theme)
                            return (
                                <Menu
                                    theme={theme}
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
                                        <Menu.Item
                                            key="/account"
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
                                        <Menu.SubMenu
                                            icon={<UserOutlined />}
                                            title="Profile"
                                        >
                                            <Menu.Item
                                                key="/account"
                                                icon={<UserOutlined />}
                                            >
                                                My Profile
                                            </Menu.Item>
                                            <Menu.Item
                                                key="/editUser"
                                                icon={<EditOutlined />}
                                            >
                                                Edit
                                            </Menu.Item>
                                            <Menu.Item
                                                icon={<LogoutOutlined />}
                                                onClick={()=>{logout()}}
                                            >
                                                Logout
                                            </Menu.Item>
                                        </Menu.SubMenu>
                                    )}

                                    <Switch
                                        checked={theme === "dark"}
                                        onChange={e => {
                                            toggleTheme(
                                                theme === "dark"
                                                    ? "light"
                                                    : "dark"
                                            )
                                        }}
                                        checkedChildren="dark"
                                        unCheckedChildren="light"
                                    />
                                </Menu>
                            )
                        }}
                    </ThemeToggler>
                </Space>
            </Space>
        </Affix>
    )
}
