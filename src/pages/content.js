import React from "react"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const Content = () => (
  <Layout>
    <SEO title="Content" />
    <h1>Content Page</h1>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image imageName="hot-coffee"/>
    </div>
  </Layout>
)

export default Content