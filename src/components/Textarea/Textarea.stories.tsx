import { Meta, StoryObj } from "@storybook/react"
import { Textarea } from "./Textarea"

const meta: Meta<typeof Textarea> = {
  title: "Components/__DATA ENTRY__/Textarea",
  component: Textarea,
}

export default meta

type Story = StoryObj<typeof Textarea>

export const Default: Story = {}
