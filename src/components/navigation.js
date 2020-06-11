import React, { useState, useEffect } from "react"
import { Link, navigate } from "gatsby"
import { ThemeToggler } from "gatsby-plugin-dark-mode"
import { useAuth0 } from "../services/auth.API"
import { Affix, Button, Space, Menu, Switch } from "antd"
import { UserOutlined, CoffeeOutlined } from "@ant-design/icons"
import logo from "../../static/wr-logo.png"

export const Navigation = props => {
    const {
        isAuthenticated,
        loginWithRedirect,
        loginWithPopup,
        loading,
    } = useAuth0()

    const [currentKey, setCurrentKey] = useState(
        localStorage.getItem("currentKey") || "/"
    )

    const handleClick = e => {
        if(e.key){
            localStorage.setItem("currentKey", e.key)
            console.log(e.key)
            setCurrentKey(e.key)
            navigate(e.key)
        }
    }
    return (
        <Affix>
            <Space
                direction="vertical"
                style={{ backgroundColor: "var(--bg)" }}
            >
                <Space align="center">
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <img
                            src={logo}
                            style={{ borderRadius: 0, maxWidth: "50%"}}
                            alt="logo"
                        />
                    </div>
                </Space>
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
                                        <Menu.Item
                                            key="/account"
                                            icon={<UserOutlined />}
                                        >
                                            Profile
                                        </Menu.Item>
                                    )}

                                    <Switch
                                        checked={theme === "dark"}
                                        onChange={e => {
                                            // changeTheme(theme)
                                            // setCurrentTheme(
                                            //     theme === "dark"
                                            //         ? "light"
                                            //         : "dark"
                                            // )
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
