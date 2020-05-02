import React from "react"
import { Link, navigate } from "gatsby"
import { Menu, Switch } from "antd"
import {
    MailOutlined,
    AppstoreOutlined,
    SettingOutlined,
    CoffeeOutlined
} from "@ant-design/icons"

const { SubMenu } = Menu

class navbar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            theme: "light",
            current: props.currentKey,
            menuLinks: props.menuLinks
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

    render() {
        return (
            <>
                <Switch
                    checked={this.state.theme === "dark"}
                    onChange={this.changeTheme}
                    checkedChildren="Dark"
                    unCheckedChildren="Light"
                />
                <br />
                <br />
                <Menu
                    theme={this.state.theme}
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
                >
                    {this.state.menuLinks.map( menuItem => (
                        <Menu.Item key={menuItem.link} icon={<CoffeeOutlined />}>
                            {menuItem.name}
                        </Menu.Item>
                    ))}
                </Menu>
            </>
        )
    }
}

export default navbar
