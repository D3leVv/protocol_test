import { Meta, StoryObj } from "@storybook/react"
import { ResetPassword } from "./ResetPassword"

const meta: Meta<typeof ResetPassword> = {
  title: "Pages/SigningUp/ResetPassword",
  component: ResetPassword,
}

export default meta

type StoryProps = StoryObj<typeof meta>

export const Default: StoryProps = {
  args: {},
}
