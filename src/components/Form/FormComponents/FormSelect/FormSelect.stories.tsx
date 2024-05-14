import { CalendarIcon, ClockIcon, TvIcon } from "@heroicons/react/24/outline"
import { Meta, StoryObj } from "@storybook/react"

import { FormSelect } from "lib/Form/FormComponents/FormSelect/FormSelect"

import { defaultArgTypes, defaultArgs } from "lib/Form/FormComponents/constants"

import { removeFromArgsTable } from "utils"

const options = [
  { name: "hi", val: "1", id: 1 },
  { name: "hi2", val: "2", id: 2 },
  { name: "hi3", val: "3", id: 3 },
  { name: "hi4", val: "4", id: 4 },
  { name: "hi5", val: "5", id: 5 },
]

const meta: Meta<typeof FormSelect> = {
  title: "Components/Form/FormSelect",
  component: FormSelect,
  args: {
    ...defaultArgs,
    options,
    keyName: "id",
  },
  argTypes: {
    ...defaultArgTypes,
    ...removeFromArgsTable(["onChange", "renderProp", "keyName", "onChange", "value", "id", "options", "keyName"]),

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
  tags: ["autodocs"],
}

export default meta

type StoryType = StoryObj<typeof meta>

export const Default: StoryType = {
  render: function Render(args) {
    return <FormSelect {...args} renderProp={(option) => option.name} />
  },
}

export const WithError: StoryType = {
  render: function Render(args) {
    return <FormSelect {...args} renderProp={(option) => option.name} />
  },
}
