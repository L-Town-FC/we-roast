import React from "react"
import { getProfile, isAuthenticated } from "../services/auth"
import SEO from "../components/seo"
import { Card } from "antd"

const IndexPage = ({ data }) => {
    return (
        <>
            <SEO title="Home" />
            <h3 style={{color:'var(--titleNormal)'}}>Hi {isAuthenticated() ? getProfile().name : "world"}!</h3>
            <Card hoverable>
                At WE ROAST, we enjoy the highest quality coffee, sourced from
                around the world!
            </Card>
            <br />
            <Card hoverable>
                Coffee is the fuel We. need to start the day early and it
                carries us over the finish line when it is late. Coffee means
                something different to everyone and those stories are important!
            </Card>
            <div>
                <img
                    src="https://source.unsplash.com/featured/?coffee"
                    alt="randomCoffee"
                />
            </div>
        </>
    )
}

export default IndexPage
