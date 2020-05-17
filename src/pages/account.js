import React from "react"
import { useAuth0 } from "../services/auth.API"
import { ProtectedRoute } from "../components/protected-route"

const Account = () => {
  const { loading, user, isAuthenticated } = useAuth0()
  if (loading || !user) {
    return <p>Loading...</p>
  }

  return (
      <ProtectedRoute>
        <p>Check out the user data supplied by Auth0, below:</p>
        <pre>{isAuthenticated && JSON.stringify(user, null, 2)}</pre>
      </ProtectedRoute>
  )
}

export default Account