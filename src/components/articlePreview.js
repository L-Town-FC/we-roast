import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import { Divider, Space } from "antd"

export default ({ article }) => (
  <Space direction="vertical">
    <Img alt="blogHero" fluid={article.heroImage.fluid} style={{borderRadius:"50%", height:"50%"}} />
    <Divider />
    <h3>
      <Link to={`/blog/${article.slug}`}>{article.title}</Link>
    </h3>
    <small>{article.publishDate}</small>
    <div
      dangerouslySetInnerHTML={{
        __html: article.description.childMarkdownRemark.html,
      }}
    />
    <ul>
      {article.tags &&
        article.tags.map(tag => (
          <li key={tag}>
            {tag}
          </li>
        ))}
    </ul>
  </Space>
)