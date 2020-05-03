import React from "react"
import { getProfile, logout } from "../services/auth"
import SEO from "./seo"
import { Button } from "antd"

const Profile = () => (
    <div>
        <SEO title="Profile" />
        <h1>Your profile</h1>
        <img src={getProfile().picture} />
        <ul>
            <li>Name: {getProfile().name}</li>
            <li>Nickname: {getProfile().nickname}</li>
            <li>E-mail: {getProfile().email}</li>
        </ul>
        <a
            href="#logout"
            onClick={e => {
                logout()
                e.preventDefault()
            }}
        >
            Log Out
        </a>
        <Button
            type="primary"
            onClick={e => {
                logout()
                e.preventDefault()
            }}
        >
            Loggout
        </Button>
        <img
            src="https://source.unsplash.com/featured/?coffee"
            alt="randomCoffee"
        />
    </div>
)

export default Profile
