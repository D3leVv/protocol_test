import type { Meta, StoryFn } from "@storybook/react"

import { Uploaded, UploadedProps } from "./Uploaded"

const meta: Meta<UploadedProps> = {
  title: "Components/__DATA ENTRY__/Upload",
  component: Uploaded,
  argTypes: {},
}

export default meta

const Template: StoryFn<UploadedProps> = (args) => <Uploaded {...args} />

export const Upload = Template.bind({})
Upload.args = {
  fileName: "Hello World.pdf",
  deleteFile: () => {},
  downloadFile: () => {},
}
