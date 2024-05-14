import type { Meta, StoryObj } from "@storybook/react"

import { Avatar } from "./Avatar"

const meta: Meta<typeof Avatar> = {
  title: "Components/__DATA DISPLAY__/Avatar",
  component: Avatar,
  args: {
    tooltipText: "Tooltip text",
    tooltipPosition: "top",
    size: "lg",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    imagePosition: "center",
  },
  argTypes: {
    size: {
      options: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl"],
      control: { type: "select" },
    },
    imageUrl: {
      control: {
        type: "text",
      },
    },
    imagePosition: {
      options: ["top", "bottom", "left", "right", "center"],
      control: { type: "select" },
    },
    tooltipText: {
      control: { type: "text" },
    },
    tooltipPosition: {
      options: ["top", "right", "bottom", "left"],
      control: { type: "select" },
    },
  },
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof Avatar>

export const Default: Story = {
  args: {
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    imagePosition: "center",
  },
}

export const WithText: Story = {
  args: {
    children: "A",
    imageUrl: undefined,
  },
}
