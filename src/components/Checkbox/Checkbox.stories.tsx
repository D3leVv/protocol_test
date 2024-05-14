import { Meta, StoryFn } from "@storybook/react"
import { Checkbox } from "./Checkbox"

const story: Meta = {
  title: "Components/__Data Entry__/Checkbox",
  component: Checkbox,
}

export default story

const Template: StoryFn<typeof Checkbox> = (args) => <Checkbox {...args} />

export const Default = Template.bind({})

Default.args = {
  defaultChecked: false,
  disabled: false,
  label: "Checkbox",
  explanationText: "Explanation text",
}
