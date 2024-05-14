import { useArgs } from "@storybook/preview-api"
import { Meta, StoryObj } from "@storybook/react"
import { removeFromArgsTable } from "utils"
import { DatePicker } from "./DatePicker"

const meta: Meta<typeof DatePicker> = {
  title: "Components/__DATA ENTRY__/DatePicker",
  component: DatePicker,
  argTypes: {
    ...removeFromArgsTable(["close", "meetings", "id", "range", "onChange", "className"]),
    value: { control: { type: "date" } },
  },
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof DatePicker>

export const Default: Story = {
  render: function Render(args) {
    const [{ value }, setArgs] = useArgs()
    return <DatePicker {...args} onChange={(value: Date | null) => setArgs({ value })} value={value} />
  },
}
