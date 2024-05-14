import { Meta, StoryObj } from "@storybook/react"
import { expect, userEvent, within } from "@storybook/test"
import { defaultArgTypes, defaultArgs } from "lib/Form/FormComponents/constants"
import { defaultStateTest, removeFromArgsTable } from "utils"
import { FormInputField } from "./FormInputField"

const meta: Meta<typeof FormInputField> = {
  title: "Components/Form/FormInputField",
  component: FormInputField,
  tags: ["autodocs"],
  argTypes: {
    ...defaultArgTypes,
    ...removeFromArgsTable(["inputFieldClassName", "prefixIcon", "suffixIcon"]),
  },
  args: {
    ...defaultArgs,
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
    const inputText = canvas.getByLabelText(/test/i)
    if (DefaultState.play) {
      await DefaultState.play(context)
    }
    await userEvent.type(inputText, "testing")
    await userEvent.click(submitBtn)
    await userEvent.clear(inputText)
    await userEvent.click(submitBtn)
    await expect(canvas.getByTestId("error-test")).toBeInTheDocument()
  },
}

export const SuccessfullSubmit: Story = {
  play: async (context) => {
    const canvas = within(context.canvasElement)
    const submitBtn = canvas.getByText("Submit")
    const inputText = canvas.getByLabelText(/test/i)

    if (DefaultState.play && WithError.play) {
      await DefaultState.play(context)
      await WithError.play(context)
    }

    await userEvent.clear(inputText)
    await userEvent.type(inputText, "testingss")
    await userEvent.click(submitBtn)
    await expect(await canvas.findByRole("alert")).toBeInTheDocument()
  },
}
