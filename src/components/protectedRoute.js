import React, { useEffect } from "react"
import { useAuth0 } from "../services/auth.service"
import LoadingPour from "../components/loadingPour"

export const ProtectedRoute = ({ children }) => {
  const { loading, isAuthenticated, loginWithRedirect, loginWithPopup } = useAuth0()
  useEffect(() => {
    if (loading || isAuthenticated) {
      return <LoadingPour />
    }
    const asyncLogin = async () => {
      await loginWithRedirect({
        appState: { targetUrl: window.location.pathname },
      })
    }
    asyncLogin()
  }, [loading, isAuthenticated, loginWithRedirect])
  return children
}