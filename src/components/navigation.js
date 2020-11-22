import React, { useState, useEffect } from "react"
import { navigate } from "gatsby"
import { ThemeToggler } from "gatsby-plugin-dark-mode"
import { useAuth0 } from "../services/auth.service"
import { Affix, Space, Menu, Switch } from "antd"
import {
    UserOutlined,
    CoffeeOutlined,
    MenuOutlined,
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

    const [currentKey, setCurrentKey] = useState(window.location.pathname)

    const handleClick = e => {
        if (e.key && e.key !== "/theme") {
            console.log(e.key)
            setCurrentKey(e.key)
            navigate(e.key)
        }
    }

    useEffect(() => {
        setCurrentKey(window.location.pathname)
    }, [window.location.pathname])

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
                                    overflowedIndicator={<MenuOutlined size="large" />}
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
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
                                    {!loading &&
                                        (!isAuthenticated ? (
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
                                        ) : (
                                            <Menu.Item
                                                key="/account"
                                                icon={<UserOutlined />}
                                                // title="Profile"
                                            >
                                                Profile
                                            </Menu.Item>
                                        ))}
                                        <Menu.Item
                                            key="/theme"
                                        >
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
                                        </Menu.Item>
                                </Menu>
                            )
                        }}
                    </ThemeToggler>
                </Space>
            </Space>
        </Affix>
    )
}
