import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Image from "../components/image"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>At WE ROAST, we enjoy the highest quality coffee, sourced from around the world! </p>
    <p>Now go build something great.</p>
    <div>
      <Image imageName="hot-coffee"/>
      {/*  Could be useful at some point */}
      {/* <img src="https://source.unsplash.com/featured/?coffee" alt="" /> */}
    </div>
  </Layout>
)

export default IndexPage