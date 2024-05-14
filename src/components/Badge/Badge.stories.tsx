import type { Meta, StoryObj } from "@storybook/react"

import { Badge } from "./Badge"

const meta: Meta<typeof Badge> = {
  title: "Components/__DATA DISPLAY__/Badge",
  component: Badge,
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {
  args: {
    children: "Value",
  },
  argTypes: {
    children: {
      name: "Text",
      control: {
        type: "text",
      },
    },
    variant: {
      options: ["info", "success", "warning", "error", "neutral", "custom"],
      control: {
        type: "select",
      },
    },
    tooltipText: {
      control: { type: "text" },
    },
    tooltipPosition: {
      options: ["top", "bottom", "left", "right"],
      control: { type: "select" },
    },
  },
  parameters: {
    layout: "centered",
  },
}
