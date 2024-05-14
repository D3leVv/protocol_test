import { Combobox } from "@headlessui/react"
import { Label as CustomLabel } from "lib/Label/Label"
import { ReactNode } from "react"

interface Props {
  name?: string
  error?: string
  label?: string
  required?: boolean
  disabled?: boolean
  children?: ReactNode
  labelClassName?: string
}

export const ComboBoxLabel = ({ label, children, required }: Props) => (
  <Combobox.Label as={CustomLabel} label={label ? label : ""} required={required}>
    {children}
  </Combobox.Label>
)
