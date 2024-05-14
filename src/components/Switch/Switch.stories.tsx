import type { Meta, StoryObj } from "@storybook/react"

import { Switch } from "./Switch"

const meta: Meta<typeof Switch> = {
  title: "Components/__BUTTONS__/Switch",
  component: Switch,
}

export default meta
type Story = StoryObj<typeof Switch>

export const Default: Story = {
  args: {
    label: "Switch",
    onChange: (enabled) => {
      console.log(enabled)
    },
    labelPosition: "right",
  },
  argTypes: {},
  parameters: {
    layout: "centered",
  },
}
