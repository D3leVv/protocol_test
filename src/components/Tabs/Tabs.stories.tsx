import { PencilIcon } from "@heroicons/react/24/outline"
import type { Meta, StoryFn } from "@storybook/react"
import { Tabs, TabsProps } from "./Tabs"

const meta: Meta<TabsProps> = {
  title: "Components/Navigation/Tabs",
  component: Tabs,
  args: {
    variant: "variant1",
  },
  argTypes: {
    variant: {
      options: ["variant1", "variant2"],
      control: { type: "radio" },
    },
    items: {
      control: false,
    },
  },
}

export default meta

const Template: StoryFn<TabsProps> = (args) => <Tabs {...args} />

export const Default = Template.bind({})
Default.args = {
  items: [
    {
      label: "Tab 1",
      content: "Tab 1 content",
    },
    {
      label: "Tab 2",
      content: "Tab 2 content",
      disabled: true,
    },
    {
      label: "Tab 3",
      content: "Tab 3 content",
    },
  ],
}

export const WithPrefix = Template.bind({})
WithPrefix.args = {
  items: [
    {
      label: (
        <>
          <PencilIcon className="h-5 w-5" /> Tab name
        </>
      ),
      content: "Tab 1 content",
    },
    {
      label: (
        <>
          <PencilIcon className="h-5 w-5" /> Tab name 2
        </>
      ),
      content: "Tab 2 content",
    },
    {
      label: (
        <>
          <PencilIcon className="h-5 w-5" /> Tab name 3
        </>
      ),
      content: "Tab 3 content",
    },
  ],
}
