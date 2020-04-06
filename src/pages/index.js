import React from "react"
import { Link } from "gatsby"
import Header from "../components/header"

export default () => (
  <div style={{ color: `brown` }}>
    <Link to="/contact/">Contact</Link>
    <Header headerText="We Roast!" />
    <p>International Roasts!</p>
    <img src="https://source.unsplash.com/featured/?coffee" alt="" />
  </div>
)