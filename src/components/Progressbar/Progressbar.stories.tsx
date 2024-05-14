import type { Meta, StoryObj } from "@storybook/react"

import { Progressbar } from "./Progressbar"

const meta: Meta<typeof Progressbar> = {
  title: "Components/__DATA DISPLAY__/Progress bar",
  component: Progressbar,
  args: {
    tooltipText: "Tooltip text",
    tooltipPosition: "top",
    progress: 50,
    height: 4,
  },
  argTypes: {
    tooltipText: {
      control: { type: "text" },
    },
    tooltipPosition: {
      options: ["top", "right", "bottom", "left"],
      control: { type: "select" },
    },
    motionKey: {
      control: false,
    },
  },
}

export default meta
type Story = StoryObj<typeof Progressbar>

export const Default: Story = {
  render: (args) => {
    return (
      <div className="flex w-full items-center gap-4 lg:flex lg:flex-col lg:items-start">
        <h4 className="hidden text-h5 lg:block">Step 1 of 9 </h4>
        <Progressbar {...args} />
        <h4 className=" text-h5 lg:hidden">1/9 </h4>
      </div>
    )
  },
}
