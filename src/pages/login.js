import React from "react"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const Login = () => (
  <Layout>
    <SEO title="Login" />
    <h1>Login</h1>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image imageName="hot-coffee"/>
    </div>
  </Layout>
)

export default Login