import React from "react"
import { Link } from "gatsby"
import Header from "../components/header"

export default () => (
  <div style={{ color: `purple` }}>
    <Link to="/contact/">Contact</Link>
    <Header headerText="International Roasts!" />
    <p>What a world.</p>
    <img src="https://source.unsplash.com/featured/?coffee" alt="" />
  </div>
)