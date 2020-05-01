import React from "react"
import { Link, graphql } from "gatsby"
import { css } from "@emotion/core"
import { rhythm } from "../utils/typography"
import { getProfile, isAuthenticated } from "../services/auth"
import { Button } from 'antd'



import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi {isAuthenticated() ? getProfile().name : "world"}!</h1>
      <p>
        At WE ROAST, we enjoy the highest quality coffee, sourced from around
        the world!{" "}
      </p>
      <p>Now go build something great.</p>
      <Button type="primary">Buttons!</Button>
      <div> 
        <img src="https://source.unsplash.com/featured/?coffee" alt="" />
      </div>
    </Layout>
  )
}

export default IndexPage
