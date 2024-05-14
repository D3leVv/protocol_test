import { useArgs } from "@storybook/preview-api"
import { Meta, StoryObj } from "@storybook/react"
import { removeFromArgsTable } from "utils"
import { Calendar } from "./Calendar"

const meta: Meta<typeof Calendar> = {
  title: "Components/__DATA ENTRY__/Calendar",
  component: Calendar,
  tags: ["autodocs"],
  argTypes: {
    ...removeFromArgsTable(["close", "id", "range", "onChange", "meetings"]),
    value: { control: { type: "date" } },
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: function Render(args) {
    const [{ value }, setArgs] = useArgs()
    const onChange = (value: Date | null) => setArgs({ value })
    return <Calendar {...args} onChange={onChange} value={value} />
  },
}
