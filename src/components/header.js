import { Link, navigate } from "gatsby"
import { getUser, isLoggedIn, logout } from "../services/auth"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle, menuLinks }) => {
    let greetingMessage = ""
    if (isLoggedIn()) {
        greetingMessage = `Hello ${getUser().name}`
    } else {
        greetingMessage = "You are not logged in"
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
                            {isLoggedIn() ? (
                                <li
                                    href="/"
                                    onClick={event => {
                                        event.preventDefault()
                                        logout(() => navigate(`/app/login`))
                                    }}
                                    style={{
                                        listStyleType: `none`,
                                        padding: `1rem`,
                                    }}
                                >
                                    Logout
                                </li>
                            ) : null}
                            <li
                                style={{
                                    listStyleType: `none`,
                                    padding: `1rem`,
                                }}
                            >
                                {greetingMessage}
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
