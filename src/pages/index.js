import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>At WE ROAST, we enjoy the highest quality coffee, sourced from around the world! </p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <img src="https://source.unsplash.com/featured/?coffee" alt="" />
    </div>
  </Layout>
)

export default IndexPage