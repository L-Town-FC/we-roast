import { Link, navigate } from "gatsby"
import { getProfile, isAuthenticated, logout } from "../services/auth"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle, menuLinks }) => {
    let greetingMessage = ""
    if (isAuthenticated()) {
        greetingMessage = `Hello ${getProfile().name}`
    } else {
        greetingMessage = "login"
    }
    return (
        <header
            style={{
                background: `#362d26`,
                marginBottom: `1.45rem`,
            }}
        >
            <div
                style={{
                    margin: `0 auto`,
                    maxWidth: 960,
                    padding: `1.45rem 1.0875rem`,
                }}
            >
                <h1 style={{ margin: 0 }}>
                    <Link
                        to="/"
                        // style={{
                        //   color: `white`,
                        //   textDecoration: `none`
                        // }}
                    >
                        {siteTitle}
                    </Link>
                </h1>
                <div>
                    <nav>
                        <ul style={{ display: "flex", flex: 1 }}>
                            {menuLinks.map(link => (
                                <li
                                    key={link.name}
                                    style={{
                                        listStyleType: `none`,
                                        padding: `1rem`,
                                    }}
                                >
                                    <Link to={link.link}>{link.name}</Link>
                                </li>
                            ))}
                            <li
                                style={{
                                    listStyleType: `none`,
                                    padding: `1rem`,
                                }}
                            >
                                <Link to="/app/profile">{greetingMessage}</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}

Header.propTypes = {
    siteTitle: PropTypes.string,
}

Header.defaultProps = {
    siteTitle: ``,
}

export default Header
