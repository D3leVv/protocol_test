import { Meta, StoryObj } from "@storybook/react"
import { Register } from "lib/pages/SigningUp/Register/Register"
import { RegisterV2 } from "lib/pages/SigningUp/Register/RegisterV2"
import { RegisterV3 } from "lib/pages/SigningUp/Register/RegisterV3"
import { RegisterV4 } from "./RegisterV4"
import { RegisterV5 } from "./RegisterV5"
import { RegisterV6 } from "./RegisterV6"

const meta: Meta<typeof Register> = {
  title: "Pages/SigningUp/Register",
  component: Register,
  args: {},
  argTypes: {},
  tags: ["autodocs"],
}

export default meta

type StoryType = StoryObj<typeof meta>

export const Default: StoryType = {
  render: function Render(args) {
    return <Register {...args} />
  },
}

export const V2: StoryType = {
  render: function Render(args) {
    return <RegisterV2 {...args} />
  },
}

export const V3: StoryType = {
  render: function Render(args) {
    return <RegisterV3 {...args} />
  },
}

export const V4: StoryType = {
  render: function Render(args) {
    return <RegisterV4 {...args} />
  },
}

export const V5: StoryType = {
  render: function Render(args) {
    return <RegisterV5 {...args} />
  },
}
export const V6: StoryType = {
  render: function Render(args) {
    return <RegisterV6 {...args} />
  },
}
