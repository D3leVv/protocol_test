import type { Meta, StoryObj } from "@storybook/react"

import { PencilIcon } from "@heroicons/react/24/outline"
import { Button } from "./Button"

const meta: Meta<typeof Button> = {
  title: "Components/__BUTTONS__/Button",
  component: Button,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    children: "Button",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      options: ["primary", "secondary", "text", "error", "custom", "green"],
      control: { type: "radio" },
    },
    size: {
      options: ["xs", "sm", "md", "lg", "xl"],
      control: { type: "radio" },
    },
    children: {
      name: "Text",
      control: { type: "text" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    loading: {
      control: { type: "boolean" },
    },
    tooltipText: {
      control: { type: "text" },
    },
    tooltipPosition: {
      options: ["top", "right", "bottom", "left"],
      control: { type: "select" },
    },
    suffixIcon: {
      control: false,
    },
    prefixIcon: {
      control: false,
    },
    bgColor: {
      control: { type: "color" },
      if: { arg: "variant", eq: "custom" },
    },
    hoverBgColor: {
      control: { type: "color" },
      if: { arg: "variant", eq: "custom" },
    },
    hoverTextColor: {
      control: { type: "color" },
      if: { arg: "variant", eq: "custom" },
    },
    textColor: {
      control: { type: "color" },
      if: { arg: "variant", eq: "custom" },
    },
  },
  parameters: {
    layout: "centered",
  },
}

export const WithPrefix: Story = {
  args: {
    ...Default.args,
    prefixIcon: <PencilIcon className="h-4 w-4" />,
  },
  argTypes: {
    ...Default.argTypes,
  },
  parameters: {
    ...Default.parameters,
  },
}

export const WithSuffix: Story = {
  args: {
    ...Default.args,
    suffixIcon: <PencilIcon className="h-4 w-4" />,
  },
  argTypes: {
    ...Default.argTypes,
  },
  parameters: {
    ...Default.parameters,
  },
}
