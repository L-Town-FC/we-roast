import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import PrivateRoute from "../components/privateRoute"
import Profile from "../components/profile"

const App = () => (
    <>
        <Router>
            <PrivateRoute path="/app/profile" component={Profile} />
        </Router>
    </>
)

export default App;