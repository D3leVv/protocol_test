import type { Meta, StoryObj } from "@storybook/react"

import { Card } from "./Card"

const meta: Meta<typeof Card> = {
  title: "Components/__DATA DISPLAY__/Card",
  component: Card,
}

export default meta

type Story = StoryObj<typeof Card>

export const Default: Story = {
  args: {
    children: "Card",
  },
  argTypes: {
    titlePrefix: {
      control: false,
    },
    title: {
      control: "text",
    },
    description: {
      control: "text",
    },
  },
}
