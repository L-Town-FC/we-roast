import auth0 from "auth0-js"

import { navigate } from "gatsby"

export const isBrowser = () => typeof window !== "undefined"

// this fails on build
const auth = isBrowser()
    ? new auth0.WebAuth({
          domain: process.env.AUTH0_DOMAIN,
          clientID: process.env.AUTH0_CLIENTID,
          redirectUri: process.env.AUTH0_CALLBACK,
          responseType: "token id_token",
          scope: "openid profile email",
      })
    : {}

// Using auth0 as oposed to local
// insert after auth const
const tokens = {
    accessToken: false,
    idToken: false,
    expiresAt: false,
}

let user = {}

export const isAuthenticated = () => {
    if (!isBrowser()) {
        return
    }
    return localStorage.getItem("isLoggedIn") === "true"
}

export const login = () => {
    if (!isBrowser()) {
        return
    }
    auth.authorize({
        appState: `${window.location.pathname}${window.location.search}`,
    })
}

const setSession = (cb = () => {}) => (err, authResult) => {
    if (err) {
        navigate("/")
        cb()
        return
    }

    if (authResult && authResult.accessToken && authResult.idToken) {
        let expiresAt = authResult.expiresIn * 1000 + new Date().getTime()
        tokens.accessToken = authResult.accessToken
        tokens.idToken = authResult.idToken
        tokens.expiresAt = expiresAt
        user = authResult.idTokenPayload
        localStorage.setItem("isLoggedIn", true)
        const redirect = authResult.appState || "/app/profile"
        console.log(redirect)
        navigate(redirect)
        cb()
    }
}

export const handleAuthentication = () => {
    if (!isBrowser()) {
        return
    }
    auth.parseHash(setSession())
}

export const getProfile = () => {
    return user
}

export const silentAuth = callback => {
    if (!isAuthenticated()) return callback()
    auth.checkSession(
        {
            state: window.location.pathname + window.location.search,
        },
        setSession(callback)
    )
}

export const logout = () => {
    localStorage.setItem("isLoggedIn", false)
    auth.logout({
        returnTo: process.env.AUTH0_LOGOUT,
        client_id: process.env.AUTH0_CLIENTID,
    })
}