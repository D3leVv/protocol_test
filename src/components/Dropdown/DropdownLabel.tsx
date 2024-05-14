import { Combobox } from "@headlessui/react"

// Label for the dropdown
interface DropdownLabelProps {
  label: string
  required?: boolean
  id?: string
}

export const DropdownLabel = ({ label, required, id }: DropdownLabelProps) => (
  <Combobox.Label htmlFor={id} className="block text-body2/medium leading-6 text-foreground">
    {label}
    {required && <span className="text-red-500">*</span>}
  </Combobox.Label>
)
