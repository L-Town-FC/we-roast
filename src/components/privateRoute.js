import React, { Component } from "react"
import { navigate } from "gatsby"
import { isAuthenticated, login, getProfile } from "../services/auth"

const PrivateRoute = ({ component: Component, location, ...rest }) => {
    if (!isAuthenticated()) {
        login()
        return <p>Redirecting to login...</p>
    }

    return <Component {...rest} />
}

export default PrivateRoute
