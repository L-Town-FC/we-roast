import React from "react"
import SEO from "../components/seo"
import { Card, Carousel, Col, List, Row, Space } from "antd"

const bullets = [
    "The coffee we enjoy is purchased and imported using ethical business practices, making sure the world's coffee farmers are paid well for their hard work",
    "Farmers have the resources to grow and improve their operations to be competitive in the market and grow their best coffee Genetic diversity within the coffee species is healthy",
    "The many different adaptations within the coffee genuses are cataloged so that they can be safeguarded and improved",
    "The coffee industry is prepared to grapple and cope with the short term and long term effects of climate change",
]

const values = [
    {title: "Mission", blurb: "Grow, protect, and enhance supplies of quality coffee while improving the livelihoods of the families who produce it."},
    {title: "Strategy", blurb: "All of our projects are designed to enhance the livelihoods of the producers who are the stewards of both quality and productivity. If we lose them, we lose the game and future of the industry."},
    {title: "Vision", blurb: "To create a toolbox of coffee varieties, genetic resources and accompanying technologies and to disseminate them strategically and collaboratively in producing countries to alleviate constraints to the supply chain of high quality"},
]

const Conversation = () => (
    <>
        <SEO title="Conversation" />
        <h2
            style={{
                backgroundColor: "var(--bg)",
                color: "var(--titleNormal)",
                marginTop: "20px"
            }}
        >
            Just like coffee, conservation is the product of work in many
            stages!
        </h2>
        <Space direction="vertical">
            <Card hoverable>
                Supporting coffee in all areas is essential to the health and
                longevity of the industry. We trust and endorse organizations
                who work hard to ensure the following
            </Card>
            <List
                dataSource={bullets}
                renderItem={item => <Card>{item}</Card>}
                style={{ color: "var(--titleNormal)" }}
            />
            <a href="https://www.rainforest-alliance.org/">
                <Card title="The Rainforest Alliance">
                    <img
                        src={"/rainforestAlliance.png"}
                        alt="rainforestAllianceLogo"
                    />
                    <p>
                        The Rainforest Alliance Certified seal is awarded to farms,
                        forests, and businesses that meet rigorous environmental and
                        social standards encompassing the following areas Biodiversity
                        conservation Improved livelihoods and human well-being Natural
                        resource conservation Effective planning and farm management
                        systems The Alliance focuses on the Human aspect of coffee
                        growing that WeRoast cares very much about supporting. We Roast
                        often talks about the many steps of processing coffee, well the
                        Rainforest Alliance supports the people behind all the hard
                        work. You can support them with donations, or simply by
                        purchasing your coffee from a certified farm. This simple step
                        ensures that your morning coffee isn't the product of any bad
                        business, that the farmers and importers aren't being taken
                        advantage of, and that their employees are treated fairly as
                        well.
                    </p>
                </Card>
            </a>
            <a href="https://worldcoffeeresearch.org/">
                <Card title="World Coffee Research">
                    <img
                        src={"/worldCoffeeResearch.png"}
                        alt="rainforestAllianceLogo"
                    />
                    <p>
                        For those interested in the science behind a healthy coffee
                        industry, this organization needs your support. Visit the
                        World Coffee Research page to learn more about the genetic
                        makeup of the coffee plant, and what is being done to
                        advantageously diversify it!
                    </p>
                </Card>
            </a>
            <List
                dataSource={values}
                itemLayout="vertical"
                renderItem={({title, blurb}) => <Card title={title}>{blurb}</Card>}
                style={{ color: "var(--titleNormal)" }}
            />
        </Space>
        <br />
        <img
            src="https://source.unsplash.com/featured/?coffee"
            alt="randomCoffee"
        />
    </>
)

export default Conversation
