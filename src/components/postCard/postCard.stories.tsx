import React from "react"
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0"
import { PostCard } from "./postCard"

export default {
  title: "Example/PostCard",
  component: PostCard,
} as Meta

const defaultArgs = {
  frontmatter: {
    title: "Some Title of a Post",
    date: "June 06, 2020",
    description: "This is a longer description of the post",
  },
  fields: {
    slug: "some-title-of-post",
  },
  excerpt: "This is the excerpt of the post"
}


const Template: Story = (args: any) => <PostCard post={args} />

export const Example = Template.bind({})
Example.args = defaultArgs

export const ReactConstructorStyle: Story = () => <PostCard post={defaultArgs} />
