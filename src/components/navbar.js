import React from "react"
import { Link, navigate } from "gatsby"
import { Menu, Switch } from "antd"
import { UserOutlined, CoffeeOutlined } from "@ant-design/icons"
import { getProfile, isAuthenticated, logout } from "../services/auth"

class navbar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            theme: "light",
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
        console.log("click ", e)
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
            <div>
                <div
                    style={{
                        position: "relative",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <h1>
                        <Link to="/">{this.state.siteTitle}</Link>
                    </h1>
                    <Switch
                        checked={this.state.theme === "dark"}
                        onChange={this.changeTheme}
                        checkedChildren="Dark"
                        unCheckedChildren="Light"
                        style={{
                            position: "relative",
                            display: "flex",
                            justifyContent: "flex-end",
                        }}
                    />
                </div>
                <br />
                {/* <br /> */}
                <Menu
                    theme={this.state.theme}
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
                    style={{
                        position: "relative",
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
                </Menu>
            </div>
        )
    }
}

export default navbar
