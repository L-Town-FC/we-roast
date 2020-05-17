import "./src/styles/global.css"
import React from "react"
import { silentAuth } from "./src/services/auth"

import Layout from "./src/components/layout"

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

export const wrapRootElement = ({ element }) => {
    return (
        <SessionCheck>
            <Layout>
                {element}
            </Layout>
        </SessionCheck>
    )
}

// export const onServiceWorkerUpdateReady = () => {
//     const answer = window.confirm(
//         `This application has been updated. ` +
//             `Reload to display the latest version?`
//     )
//     if (answer === true) {
//         window.location.reload()
//     }
// }
