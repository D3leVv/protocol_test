import { Meta, StoryFn } from "@storybook/react"
import { CheckboxGroup } from "./CheckboxGroup"

const story: Meta = {
  title: "Components/__Data Entry__/CheckboxGroup",
  component: CheckboxGroup,
}

export default story

const Template: StoryFn<typeof CheckboxGroup> = (args) => {
  const { ...rest } = args
  return <CheckboxGroup {...rest} />
}

export const Default = Template.bind({})
Default.args = {
  options: [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
  ],
}
