import React from "react"
import PropTypes from "prop-types"
import { Card, Space } from "antd"
import { Link, navigate, graphql, useStaticQuery } from "gatsby"


const TagList = (props) => {
  const { allContentfulTag } = useStaticQuery(
    graphql`
      query allTags {
        allContentfulTag {
          edges {
            node {
              id
              title
              slug
            }
          }
        }
      }
    `
  )
  return (
    <Space direction="horizontal">
      {allContentfulTag.edges.map( ({node}) => (
          <Link key={node.id} to={`/tag/${node.slug}/`}><Card hoverable>{node.title}</Card></Link>
      ))}
    </Space>
  )
}

export default TagList