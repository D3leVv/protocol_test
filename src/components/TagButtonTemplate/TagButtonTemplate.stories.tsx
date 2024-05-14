import { ClockIcon } from "@heroicons/react/24/outline"
import type { Meta, StoryFn } from "@storybook/react"
import { TagButtonTemplate, TagButtonTemplateProps } from "./TagButtonTemplate"

const meta: Meta<TagButtonTemplateProps> = {
  title: "Components/__DATA ENTRY__/Tags",
  component: TagButtonTemplate as any,
  argTypes: {
    suffixIcon: {
      control: false,
    },
    prefixIcon: {
      control: false,
    },
    variant: {
      options: ["primary", "secondary", "text"],
      control: {
        type: "select",
      },
    },
    children: {
      name: "Text",
      control: {
        type: "text",
      },
    },
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

const Template: StoryFn<TagButtonTemplateProps> = (args) => <TagButtonTemplate {...args} />

export const Default = Template.bind({})
Default.args = {
  children: "Value",
  onClick: () => {
    alert("Clicked")
  },
  tooltipText: "Tooltip text",
  tooltipPosition: "top",
  prefixIcon: <ClockIcon className="mb-0.5 h-4 w-4" />,
}

export const WithoutIcons = Template.bind({})
WithoutIcons.args = {
  children: "Value",
  onClick: () => {
    alert("Clicked")
  },
  tooltipText: "Tooltip text",
  tooltipPosition: "top",
  suffixIcon: null,
  prefixIcon: null,
}
