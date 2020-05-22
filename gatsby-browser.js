import "./src/styles/global.css"
import React from "react"

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

export const wrapRootElement = ({ element }) => (
    <Auth0Provider
        domain={authConfig.domain}
        client_id={authConfig.clientId}
        redirect_uri={window.location.origin}
        onRedirectCallback={onRedirectCallback}
        audience={authConfig.audience}
    >
        <Layout>
            {element}
        </Layout>
    </Auth0Provider>
)


// export const onServiceWorkerUpdateReady = () => {
//     const answer = window.confirm(
//         `This application has been updated. ` +
//             `Reload to display the latest version?`
//     )
//     if (answer === true) {
//         window.location.reload()
//     }
// }
