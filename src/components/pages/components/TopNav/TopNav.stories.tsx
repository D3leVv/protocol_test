import { Meta, StoryObj } from "@storybook/react"

import { TopNav } from "./TopNav"

const meta: Meta<typeof TopNav> = {
  title: "Pages/Components/TopNav",
  component: TopNav,
}

export default meta

type StoryProps = StoryObj<typeof meta>

export const Default: StoryProps = {
  args: {},
}
