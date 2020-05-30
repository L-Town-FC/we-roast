import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"

export default ({ data }) => {
    const [starsCount, setStarsCount] = useState(0)
    useEffect(() => {
        // get data from GitHub api
        fetch(`https://api.github.com/repos/gatsbyjs/gatsby`)
            .then(response => response.json()) // parse JSON from request
            .then(resultData => {
                setStarsCount(resultData.stargazers_count)
            }) // set data for the number of stars
    }, [])
    return (
        <>
          <p>Runtime Data: Star count for the Gatsby repo {starsCount}</p>
            <div>
                <h1>My Site's Files</h1>
                <table>
                    <thead>
                        <tr>
                            <th>relativePath</th>
                            <th>prettySize</th>
                            <th>extension</th>
                            <th>birthTime</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.allFile.edges.map(({ node }, index) => (
                            <tr key={index}>
                                <td>{node.relativePath}</td>
                                <td>{node.prettySize}</td>
                                <td>{node.extension}</td>
                                <td>{node.birthTime}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export const query = graphql`
    query {
        allFile {
            edges {
                node {
                    relativePath
                    prettySize
                    extension
                    birthTime(fromNow: true)
                }
            }
        }
    }
`
