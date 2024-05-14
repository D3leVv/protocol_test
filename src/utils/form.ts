import { RegisterOptions } from "react-hook-form"

type RuleType = Omit<RegisterOptions, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled">

const emailRegex = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/)
const requiredErrorMessage = "is required"

export const emailValidation = (errorMessage: string, fieldName: string): RuleType => {
  return {
    required: `${fieldName} ${requiredErrorMessage}`,
    validate: (value) => emailRegex.test(value) || errorMessage,
  }
}

export const requiredValidation = (fieldName: string) => {
  return {
    required: `${fieldName} ${requiredErrorMessage}`,
  }
}
