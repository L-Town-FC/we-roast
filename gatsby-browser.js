import "./src/styles/global.css"
import React from "react"
import { silentAuth } from "./src/services/auth"

import Layout from "./src/components/layout"
import authConfig from "./auth_config.json"
import { Auth0Provider } from "./src/services/auth.API"

const onRedirectCallback = appState => {
    window.history.replaceState(
        {},
        document.title,
        appState && appState.targetUrl
            ? appState.targetUrl
            : window.location.pathname
    )
}

class SessionCheck extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
        }
    }

    handleCheckSession = () => {
        this.setState({ loading: false })
    }

    componentDidMount() {
        silentAuth(this.handleCheckSession)
    }

    render() {
        return (
            this.state.loading === false && (
                <React.Fragment>{this.props.children}</React.Fragment>
            )
        )
    }
}

export const wrapRootElement = ({ element }) => (
    <Auth0Provider
        domain={authConfig.domain}
        client_id={authConfig.clientId}
        redirect_uri={window.location.origin}
        onRedirectCallback={onRedirectCallback}
    >
        <Layout>
            {element}
        </Layout>
    </Auth0Provider>
)

// export const wrapRootElement = ({ element }) => {
//     return (
//         <SessionCheck>
//             <Layout>
//                 {element}
//             </Layout>
//         </SessionCheck>
//     )
// }

// export const onServiceWorkerUpdateReady = () => {
//     const answer = window.confirm(
//         `This application has been updated. ` +
//             `Reload to display the latest version?`
//     )
//     if (answer === true) {
//         window.location.reload()
//     }
// }
