import React from "react"
import { Link } from "gatsby"
import { rhythm } from "../../utils/typography"
import { Post } from "../../data/post/post"

export interface PostCardProps {
  // Some docstring
  post: Post
}

/**
 * Primary UI component for user interaction
 */
export const PostCard = (props: PostCardProps) => {
  const post = props.post

  const title = post.frontmatter.title || post.fields.slug
  return (
    <div key={post.fields.slug}>
      <h3
        style={{
          marginBottom: rhythm(1 / 4),
        }}
      >
        <Link style={{ boxShadow: `none` }} to={`/blog${post.fields.slug}`}>
          {title}
        </Link>
      </h3>
      <small>{post.frontmatter.date}</small>
      <p>{post.frontmatter.description || post.excerpt}</p>
    </div>
  )
}
