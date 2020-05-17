import React from "react"
import { Link } from "gatsby"
import { useAuth0 } from "../services/auth.API"

export const Navigation = () => {
  const { isAuthenticated, loginWithRedirect, logout, loading } = useAuth0()
  return (
    <nav>
      {!isAuthenticated && !loading && (
        <button
          onClick={() =>
            loginWithRedirect({ appState: `${window.location.pathname}` })
          }
        >
          Log in
        </button>
      )}
      {isAuthenticated && (
        <>
          <button
            onClick={() => logout()}
          >
            Log out
          </button>
          <Link to="/">
            Home
          </Link>
          <Link to="/addInfluencer">
            Add Influencer
          </Link>
          <Link to="/account">
            My Account
          </Link>
        </>
      )}
    </nav>
  )
}