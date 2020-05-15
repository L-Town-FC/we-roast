import React from "react"
import SEO from "../components/seo"
import Background from "../components/Background"
import { Card, Space } from "antd"
import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"


const About = () => {
    const aboutData = useStaticQuery(graphql`
        query {
            andrew: contentfulPerson(username: { eq: "atmollohan" }) {
                image {
                    fluid {
                        src
                        ...GatsbyContentfulFluid_tracedSVG
                    }
                }
            }
            ted: contentfulPerson(username: { eq: "tsullivan" }) {
                image {
                    fluid {
                        src
                        ...GatsbyContentfulFluid_tracedSVG
                    }
                }
            }
        }
    `)
    return (
        <Space direction="vertical" size="middle">
            <SEO title="About" />
            <h3 style={{ color: "var(--titleNormal)" }}>About Page</h3>
            <Card hoverable>
                At <b>We.</b> Roast Coffee, coffee education and exploration is
                our purpose and our passion. <b>We.</b> created a community of
                coffee people and a place for them to share their coffee
                experiences.
            </Card>
            <Card hoverable>
                <b>We.</b> want to hear from you! Share stories about the role
                coffee plays in your lives. <b>We.</b> support the irreplaceable
                Farmers who have been growing and sharing coffee with the world
                for generations, and believe in exploring their story.
            </Card>
            <Card hoverable>
                <b>We.</b> started this website to facilitate a fully immersive
                coffee experience, where you can learn about coffee from some of
                the most knowledgeable people in the industry! Together,{" "}
                <b>We.</b> let a group's passion drive a desire to learn as much
                about America’s Fuel as possible. Sign in and join our community
                to participate in the coffee conversation which started more
                than 500 years ago. <b>We.</b> promise to provide up to date
                information, fact check our stats, and if all goes well have a
                ton of fun. Welcome to
                <b>We. Roast Coffee.</b>
            </Card>
            <Space direction="vertical">
                <Card hoverable title="Founder: Ted Sullivan" size="small" style={{ width:"75%" }}>
                    <Space>
                        <Img fluid={aboutData.ted.image.fluid} alt="tedAboutPage" style={{borderRadius:"50%"}} imgStyle={{width: 'auto', height: 'auto'}} />
                        <p>The brains of the organization</p>
                    </Space>
                </Card>
                <Card hoverable title="Lead Developer: Andrew Mollohan" size="small" style={{ width:"75%" }}>
                    <Space>
                        <Img fluid={aboutData.andrew.image.fluid} alt="andrewAboutPage" style={{borderRadius:"50%"}} imgStyle={{width: 'auto', height: 'auto'}} />
                        <p>The brawn of the organization</p>
                    </Space>
                </Card>
            </Space>
            <img
                src="https://source.unsplash.com/featured/?coffee"
                alt="randomCoffee"
            />
        </Space>
    )
}

export default About
