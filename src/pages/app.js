import React from "react"
import { Router } from "@reach/router"
import PrivateRoute from "../components/privateRoute"
import Profile from "../components/profile"
import WriteBlog from "../components/writeBlog"

const App = () => (
    <>
        <Router>
            <PrivateRoute path="/app/profile" component={Profile} />
            <PrivateRoute path="/app/writeBlog" component={WriteBlog} />
        </Router>
    </>
)

export default App;