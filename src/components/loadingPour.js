import React from "react"
import pouring from "../../static/pouringCoffee.gif"

const LoadingPour = props => {
    return (
        <div style={{display:"flex", justifyContent:"center"}}>
            <img src={pouring} alt="pouring" style={{height:"40vh"}}/>
        </div>
    )
}

export default LoadingPour;