import { Meta, StoryObj } from "@storybook/react"
import { ChangePassword } from "./ChangePassword"

const meta: Meta<typeof ChangePassword> = {
  title: "Pages/SigningUp/ChangePassword",
  component: ChangePassword,
}

export default meta

type StoryProps = StoryObj<typeof meta>

export const Default: StoryProps = {
  args: {},
}
