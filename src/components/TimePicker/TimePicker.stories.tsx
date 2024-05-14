import { Meta, StoryFn } from "@storybook/react"
import { TimePicker } from "./TimePicker"

export default {
  title: "Components/__DATA ENTRY__/Time Picker",
  component: TimePicker,
} as Meta

const Template: StoryFn<typeof TimePicker> = (args) => <TimePicker {...args} />

export const Default = Template.bind({})
Default.args = {
  label: "Select Time",
  value: new Date(),
}
