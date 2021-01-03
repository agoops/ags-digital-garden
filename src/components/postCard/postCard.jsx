import React from "react"
import { Link } from "gatsby"
import { rhythm } from "../../utils/typography"

/**
 * Primary UI component for user interaction
 */
export const PostCard = ({
  node
}) => {
  const title = node.frontmatter.title || node.fields.slug
    return (
      <div key={node.fields.slug}>
        <h3
          style={{
            marginBottom: rhythm(1 / 4),
          }}
        >
          <Link style={{ boxShadow: `none` }} to={`/blog${node.fields.slug}`}>
            {title}
          </Link>
        </h3>
        <small>{node.frontmatter.date}</small>
        <p
          dangerouslySetInnerHTML={{
            __html: node.frontmatter.description || node.excerpt,
          }}
        />
      </div>
    )
}
