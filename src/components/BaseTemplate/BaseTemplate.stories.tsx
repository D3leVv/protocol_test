import { Meta, StoryObj } from "@storybook/react"
import { defaultStateTest } from "utils"
import { BaseTemplate } from "./BaseTemplate"
import { defaultArgs } from "lib/BaseTemplate/BaseTemplate.mock"

const meta: Meta<typeof BaseTemplate> = {
  title: "Components/BaseTemplate",
  component: BaseTemplate,
  tags: ["autodocs"],
  args: defaultArgs,
}

export default meta

type Story = StoryObj<typeof meta>

export const DefaultState: Story = {
  play: async ({ canvasElement }) => {
    await defaultStateTest(canvasElement)
  },
}
