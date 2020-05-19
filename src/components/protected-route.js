import { useEffect } from "react"
import { useAuth0 } from "../services/auth.API"

export const ProtectedRoute = ({ children }) => {
  const { loading, isAuthenticated, loginWithRedirect, loginWithPopup } = useAuth0()
  useEffect(() => {
    if (loading || isAuthenticated) {
      return undefined
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