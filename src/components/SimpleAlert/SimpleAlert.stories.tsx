import { Meta, StoryObj } from "@storybook/react"
import { SimpleAlert } from "./SimpleAlert"

const meta: Meta<typeof SimpleAlert> = {
  title: "Components/Feedback/SimpleAlert",
  component: SimpleAlert,
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof SimpleAlert>

export const Default: Story = {
  args: {
    text: "This is an alert!",
  },

  argTypes: {
    variant: {
      options: ["info", "success", "warning", "error"],
      control: { type: "select" },
    },
    text: {
      control: { type: "text" },
    },
  },
}
