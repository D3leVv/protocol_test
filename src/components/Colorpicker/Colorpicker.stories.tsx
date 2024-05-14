import type { Meta, StoryFn } from "@storybook/react"
import { useState } from "react"
import { Colorpicker } from "./Colorpicker"

const meta: Meta<typeof Colorpicker> = {
  title: "Components/__DATA ENTRY__/Colorpicker",
  component: Colorpicker,
  args: {
    onChange: (color) => {
      console.log(color)
    },
  },
  argTypes: {
    color: {
      control: false,
    },
  },
  parameters: {
    layout: "centered",
  },
}

export default meta

export const Default: StoryFn<typeof Colorpicker> = (args) => {
  const [color, setColor] = useState(args.color)
  return <Colorpicker {...args} color={color} onChange={setColor} />
}
