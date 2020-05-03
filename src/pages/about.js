import React from "react"

import Image from "../components/image"
import SEO from "../components/seo"

const About = () => (
  <>
    <SEO title="About" />
    <h1>About Page</h1>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image imageName="hot-coffee"/>
    </div>
  </>
)

export default About