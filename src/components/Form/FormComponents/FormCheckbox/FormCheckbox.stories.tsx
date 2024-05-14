import { Meta, StoryObj } from "@storybook/react"
import { expect, userEvent, within } from "@storybook/test"
import { defaultArgTypes, defaultArgs } from "lib/Form/FormComponents/constants"
import { defaultStateTest, removeFromArgsTable } from "utils"
import { FormCheckbox } from "./FormCheckbox"

const meta: Meta<typeof FormCheckbox> = {
  title: "Components/Form/FormCheckbox",
  component: FormCheckbox,
  tags: ["autodocs"],
  args: defaultArgs,
  argTypes: {
    ...defaultArgTypes,
    ...removeFromArgsTable(["onChange"]),
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const DefaultState: Story = {
  play: async ({ canvasElement }) => {
    await defaultStateTest(canvasElement)
  },
}

export const WithError: Story = {
  play: async (context) => {
    const canvas = within(context.canvasElement)
    const submitBtn = canvas.getByText("Submit")
    const checkboxState = canvas.getByLabelText(/test/i)
    if (DefaultState.play) {
      await DefaultState.play(context)
    }
    await userEvent.click(checkboxState)
    await userEvent.click(submitBtn)
    await expect(canvas.getByTestId("error-test")).toBeInTheDocument()
  },
}

export const SuccessfullSubmit: Story = {
  play: async (context) => {
    const canvas = within(context.canvasElement)
    const submitBtn = canvas.getByText("Submit")
    const checkbox = canvas.getByLabelText(/test/i)

    if (DefaultState.play && WithError.play) {
      await DefaultState.play(context)
      await WithError.play(context)
    }
    await userEvent.click(checkbox)
    await userEvent.click(submitBtn)
    await expect(await canvas.findByRole("alert")).toBeInTheDocument()
  },
}
