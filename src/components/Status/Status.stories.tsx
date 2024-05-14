import type { Meta, StoryObj } from "@storybook/react"

import { Status, StatusEnum } from "./Status"

const meta: Meta<typeof Status> = {
  title: "Components/__DATA DISPLAY__/Status",
  component: Status,
}

export default meta
type Story = StoryObj<typeof Status>

export const Default: Story = {
  args: {
    status: StatusEnum.Green,
    tooltipText: "Tooltip text",
    tooltipPosition: "top",
    children: "Status",
    withIcon: false,
  },
  argTypes: {
    children: {
      name: "Text",
      control: {
        type: "text",
      },
    },
    status: {
      name: "Status",
      options: ["green", "orange", "red", "blue"],
      control: {
        type: "select",
      },
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
