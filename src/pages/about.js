import React from "react"
import SEO from "../components/seo"
import Background from "../components/Background"
import { Card } from "antd"

const About = () => (
    <>
        <SEO title="About" />
        <h3 style={{ color: "var(--titleNormal)" }}>About Page</h3>
        <div>
            <Card hoverable>
                At <b>We.</b> Roast Coffee, coffee education and exploration is our
                purpose and our passion. <b>We.</b> created a community of coffee
                people and a place for them to share their coffee experiences.
            </Card>
            <br />
            <Card hoverable>
                <b>We.</b> want to hear from you! Share stories about the role coffee
                plays in your lives. <b>We.</b> support the irreplaceable Farmers who
                have been growing and sharing coffee with the world for
                generations, and believe in exploring their story.
            </Card>
            <br />
            <Card hoverable>
                <b>We.</b> started this website to facilitate a fully immersive coffee
                experience, where you can learn about coffee from some of the
                most knowledgeable people in the industry! Together, <b>We.</b> let a
                group's passion drive a desire to learn as much about America’s
                Fuel as possible. Sign in and join our community to participate
                in the coffee conversation which started more than 500 years
                ago. <b>We.</b> promise to provide up to date information, fact check
                our stats, and if all goes well have a ton of fun. Welcome to
                <b>We. Roast Coffee.</b>
            </Card>
            <Card hoverable title="Founder">Ted Sullivan</Card>
            <Card hoverable title="Lead Developer">Andrew Mollohan</Card>
        </div>
        <img
            src="https://source.unsplash.com/featured/?coffee"
            alt="randomCoffee"
        />
    </>
)

export default About
