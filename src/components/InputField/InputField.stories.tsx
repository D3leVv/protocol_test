import { CalendarIcon, ClockIcon, TvIcon } from "@heroicons/react/24/outline"
import type { Meta, StoryObj } from "@storybook/react"
import { removeFromArgsTable } from "utils"
import { InputField } from "./InputField"

const meta: Meta<typeof InputField> = {
  title: "Components/__DATA ENTRY__/Inputs/Basic Input",
  component: InputField,
  args: { label: "Example Input", placeholder: "Type here...", id: "hi" },
  argTypes: {
    ...removeFromArgsTable(["id", "type"]),
    prefixIcon: {
      control: "select",
      options: ["calendar", "clock", "tv"],
      mapping: {
        calendar: [<CalendarIcon />],
        clock: [<ClockIcon />],
        tv: [<TvIcon />],
      },
    },
    suffixIcon: {
      control: "select",
      options: ["calendar", "clock", "tv"],
      mapping: {
        calendar: [<CalendarIcon />],
        clock: [<ClockIcon />],
        tv: [<TvIcon />],
      },
    },
    required: {
      control: {
        type: "boolean",
      },
    },
    disabled: {
      control: {
        type: "boolean",
      },
    },
    label: {
      control: {
        type: "text",
      },
    },
    placeholder: {
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
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof InputField>

export const Default: Story = {}
