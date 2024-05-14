import type { Meta, StoryFn } from "@storybook/react"
import { AlertVariant, notification } from "lib/Alert/constants.ts"
import { Button } from "lib/Button/Button"
import { Alert } from "./Alert.tsx"

const story: Meta = {
  title: "Components/Feedback/Alert",
  component: Alert,
}

export default story

const Template: StoryFn<typeof Alert> = (args) => (
  <Button
    type="button"
    onClick={() => {
      notification[args.variant as AlertVariant]({
        message: String(args.variant),
      })
    }}
  >
    click me
  </Button>
)

export const Default = Template.bind({ variant: AlertVariant.INFO })
