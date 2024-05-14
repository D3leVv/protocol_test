import { Meta, StoryObj } from "@storybook/react"

import { CalendarIcon, ClockIcon, TvIcon } from "@heroicons/react/24/outline"
import { removeFromArgsTable } from "utils"
import { Select } from "./Select"
import { SelectProps } from "./types"

const options = [
  { name: "hi", val: "1", id: 1 },
  { name: "hi2", val: "2", id: 2 },
  { name: "hi3", val: "3", id: 3 },
  { name: "hi4", val: "4", id: 4 },
  { name: "hi5", val: "5", id: 5 },
]

const meta: Meta<typeof Select> = {
  title: "Components/__DATA ENTRY__/Select",
  component: Select,
  tags: ["autodocs"],
  argTypes: {
    ...removeFromArgsTable(["renderProp", "keyName", "onChange", "value", "id", "options"]),
    prefixIcons: {
      control: "select",
      options: ["calendar", "clock", "tv"],
      mapping: {
        calendar: <CalendarIcon />,
        clock: <ClockIcon />,
        tv: <TvIcon />,
      },
    },
    disabledOptions: {
      control: "select",
      options: ["1", "2", "3", "4", "5"],
      mapping: {
        1: [options[0]],
        2: [options[1]],
        3: [options[2]],
        4: [options[3]],
        5: [options[4]],
      },
    },
    suffixIcons: {
      control: "select",
      options: ["calendar", "clock", "tv"],
      mapping: {
        calendar: <CalendarIcon />,
        clock: <ClockIcon />,
        tv: <TvIcon />,
      },
    },
  },
  args: {
    options,
  },
  decorators: [(Story) => <Story />],
}

export default meta

type Story = StoryObj<SelectProps<(typeof options)[0], false>>

export const Default: Story = {
  args: { keyName: "id" },
  render: function Render(args) {
    return <Select {...args} renderProp={(option) => option.name} />
  },
}
