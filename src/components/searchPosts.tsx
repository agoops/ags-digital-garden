const rfs = require("react-use-flexsearch")

import React, { useState } from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import * as queryString from "query-string"

import { rhythm } from "../utils/typography"
import { Post, PostCard, PostCardProps } from "./postCard/postCard";

const SearchBar = styled.div`
  display: flex;
  border: 1px solid #dfe1e5;
  border-radius: 10px;
  margin: 0 auto ${rhythm(1)};
  width: 100%;
  height: 3rem;
  background: #fdfdfd;

  svg {
    margin: auto 1rem;
    height: 20px;
    width: 20px;
    color: #9aa0a6;
    fill: #9aa0a6;
  }

  input {
    display: flex;
    flex: 100%;
    height: 100%;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, "Helvetica Neue", Arial, sans-serif;
    font-size: 16px;
    background-color: transparent;
    border: none;
    margin: 0;
    padding: 0;
    padding-right: 0.5rem;
    color: rgb(55, 53, 47);
    word-wrap: break-word;
    outline: none;
  }
`

const SearchedPosts: Function = ({ results }: { results: Post[] }) => {
  console.log("From SearchedPosts");
  console.log(results);
  return results.length > 0 ? (
    results.map((node) => {
      const date = node.frontmatter.date
      const title = node.frontmatter.title || node.fields.slug
      const description = node.frontmatter.description
      const excerpt = node.excerpt
      const slug = node.fields.slug

      return (
        <div key={slug}>
          <h3
            style={{
              marginBottom: rhythm(1 / 4),
            }}
          >
            <Link style={{ boxShadow: `none` }} to={`/blog${slug}`}>
              {title}
            </Link>
          </h3>
          <small>{date}</small>
          <p
            dangerouslySetInnerHTML={{
              __html: description || excerpt,
            }}
          />
        </div>
      )
    })
  ) : (
    <p style={{ textAlign: "center" }}>
      Sorry, couldn't find any posts matching this search.
    </p>
  )
}

const AllPosts = ({ posts }: { posts: PostCardProps[] }) => (
  <div style={{ margin: "20px 0 40px" }}>
    {posts.map(post => {
      return <PostCard post={post.node} />
    })}
  </div>
)

// The serach plugin requires objects to be flat
// See the "normalizer" field: https://github.com/angeloashmore/gatsby-plugin-local-search#how-to-use
// This blog https://www.emgoto.com/gatsby-search/
// just mentions unflattening it....
// Fn to unflatten results
export const unFlattenResults = (results: any): Post[] =>
  results.map((flatPost: any) => {
    const { date, slug, description, excerpt, title } = flatPost;
    return { fields: { slug }, frontmatter: { title, date, description }, excerpt };
  });

interface SearchPostsProps {
  posts: PostCardProps[],
  localSearchBlog: any,
  location: any,
  navigate: any,
}
const SearchPosts = ({
  posts,
  localSearchBlog,
  location,
  navigate,
}: SearchPostsProps) => {
  const { search } = queryString.parse(location.search)
  console.log("PreSearch");
  console.log(posts);
  const [query, setQuery] = useState(search || "")

  console.log("SearchInput");
  console.log(localSearchBlog.index);
  console.log(localSearchBlog.store);
  const searchResults = rfs.useFlexSearch(
    query,
    localSearchBlog.index,
    JSON.parse(localSearchBlog.store)
  )
  console.log("PostSearch");
  console.log(searchResults);
  const results = unFlattenResults(searchResults);
  console.log(results);
  return (
    <>
      <SearchBar>
        <svg
          focusable="false"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
        </svg>
        <input
          id="search"
          type="search"
          placeholder="Search all posts"
          value={query}
          onChange={e => {
            navigate(
              e.target.value ? `/blog/?search=${e.target.value}` : "/blog/"
            )
            setQuery(e.target.value)
          }}
        />
      </SearchBar>
      {query ? <SearchedPosts results={results} /> : <AllPosts posts={posts} />}
    </>
  )
}

export default SearchPosts