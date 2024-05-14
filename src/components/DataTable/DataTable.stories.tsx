import { Meta, StoryFn } from "@storybook/react"
import { DataTable } from "lib/DataTable/DataTable"

const meta: Meta<typeof DataTable> = {
  title: "Components/__DATA DISPLAY__/DataTable",
  component: DataTable,
  parameters: {
    controls: { expanded: true },
  },
}

export default meta

const Template: StoryFn<typeof DataTable> = (args) => <DataTable {...args} />

export const Default = Template.bind({})

Default.args = {
  data: [],
  columns: [],
}
