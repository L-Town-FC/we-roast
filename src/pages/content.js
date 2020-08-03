import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import SEO from "../components/seo"
import TagList from "../components/tagList"
import Img from "gatsby-image"

const Content = () => {
    return (
        <>
            <SEO title="Content" />
            <h1 style={{ color: "var(--titleNormal)" }}>Content Page</h1>
            <TagList />
            <br />
            <div>
                <img
                    src="https://source.unsplash.com/featured/?coffee"
                    alt="randomCoffee"
                />
            </div>
        </>
    )
}

export default Content
