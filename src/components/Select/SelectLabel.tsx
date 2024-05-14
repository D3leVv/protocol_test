import { Listbox } from "@headlessui/react"
import { Label as CustomLabel, LabelProps } from "lib/Label/Label"

export const SelectLabel = (props: LabelProps) => <Listbox.Label as={CustomLabel} {...props} />
