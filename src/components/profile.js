import React from "react"
import { getProfile, logout } from "../services/auth"
import SEO from "./seo"


const Profile = () => (
    <div>
        <SEO title="Profile" />
        <h1>Your profile</h1>
        <ul>
            <li>Name: {getProfile().name}</li>
            <li>Nickname: {getProfile().nickname}</li>
            <li>E-mail: {getProfile().email}</li>
            <img src={getProfile().picture} />
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
        <img src="https://source.unsplash.com/featured/?coffee" alt="" />
    </div>
)

export default Profile
