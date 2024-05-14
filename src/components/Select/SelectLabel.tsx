import { Listbox } from '@headlessui/react'
import { Label as CustomLabel, LabelProps } from 'components/Label/Label'

export const SelectLabel = (props: LabelProps) => (
  <Listbox.Label as={CustomLabel} {...props} />
)
