import React from "react"
import { Link, navigate } from "gatsby"
import { Menu, Space, Switch, Affix } from "antd"
import { UserOutlined, CoffeeOutlined } from "@ant-design/icons"
import { ThemeToggler } from "gatsby-plugin-dark-mode"
import logo from "../../static/wr-logo.png"
import Logo from "./logo"

class navbar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            theme: props.theme,
            current: props.currentKey,
            menuLinks: props.menuLinks,
            siteTitle: props.siteTitle,
        }
    }

    changeTheme = value => {
        this.setState({
            theme: value ? "dark" : "light",
        })
    }

    handleClick = e => {
        navigate(e.key)
        this.setState({
            current: e.key,
        })
    }

    // greetingMessage = ""
    // if (isAuthenticated()) {
    //     greetingMessage = `Hello ${getProfile().name}`
    // } else {
    //     greetingMessage = "login"
    // }

    render() {
        return (
            <Affix>
                <div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            backgroundColor: "var(--bg)",
                        }}
                    >
                        <img
                            src={logo}
                            style={{ borderRadius: 0 }}
                            alt="logo"
                        />
                        {/* <ThemeToggler>
                            {({ theme, toggleTheme }) => {
                                theme = this.state.theme
                                localStorage.setItem("theme", theme)
                                // toggleTheme(this.state.theme)
                                return (
                                    <Switch
                                        checked={theme === "dark"}
                                        onChange={e => {
                                            this.changeTheme(e)
                                            toggleTheme(
                                                theme === "dark"
                                                    ? "light"
                                                    : "dark"
                                            )
                                        }}
                                        checkedChildren="Dark"
                                        unCheckedChildren="Light"
                                    />
                                )
                            }}
                        </ThemeToggler> */}
                    </div>
                    {/* <br /> */}

                    <Menu
                        theme={this.state.theme}
                        onClick={this.handleClick}
                        selectedKeys={[this.state.current]}
                        mode="horizontal"
                        style={{
                            // position: "relative",
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        {this.state.menuLinks.map(menuItem => (
                            <Menu.Item
                                key={menuItem.link}
                                icon={<CoffeeOutlined />}
                            >
                                {menuItem.name}
                            </Menu.Item>
                        ))}
                        <Menu.Item key="/app/profile" icon={<UserOutlined />}>
                            Profile
                        </Menu.Item>
                        {/* <Menu.Item key="lightdark" disabled> */}
                        <ThemeToggler>
                            {({ theme, toggleTheme }) => {
                                theme = this.state.theme
                                localStorage.setItem("theme", theme)
                                // toggleTheme(this.state.theme)
                                return (
                                    <Switch
                                        checked={theme === "dark"}
                                        onChange={e => {
                                            this.changeTheme(e)
                                            toggleTheme(
                                                theme === "dark"
                                                    ? "light"
                                                    : "dark"
                                            )
                                        }}
                                        checkedChildren="Dark"
                                        unCheckedChildren="Light"
                                    />
                                )
                            }}
                        </ThemeToggler>
                        {/* </Menu.Item> */}
                    </Menu>
                </div>
            </Affix>
        )
    }
}

export default navbar
