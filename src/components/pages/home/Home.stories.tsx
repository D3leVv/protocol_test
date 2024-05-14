import { Meta, StoryObj } from "@storybook/react"
import { Home } from "./Home"

const meta: Meta<typeof Home> = {
  title: "pages/Home",
  component: Home,
  tags: ["autodocs"],
  args: {
    simpleText: "Hello World",
    dataTestId: "home-page",
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const DefaultState: Story = {
  play: async ({ canvasElement }) => {
    const canvas = canvasElement as HTMLCanvasElement
    const ctx = canvas.getContext("2d")
  },
}
