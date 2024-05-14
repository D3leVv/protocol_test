import type { Meta, StoryFn } from "@storybook/react"

import { Fileupload, FileuploadProps } from "./Fileupload"

const meta: Meta<FileuploadProps> = {
  title: "Components/__DATA ENTRY__/Upload",
  component: Fileupload,
  args: {
    onUpload: () => {},
    multiple: false,
  },
  argTypes: {
    tooltipText: {
      control: { type: "text" },
    },
    tooltipPosition: {
      options: ["top", "right", "bottom", "left"],
      control: { type: "select" },
    },
  },
}

export default meta

const Template: StoryFn<FileuploadProps> = (args) => <Fileupload {...args} />

export const Default = Template.bind({})
