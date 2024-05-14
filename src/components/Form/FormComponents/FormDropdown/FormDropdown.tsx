import { Dropdown } from "lib/Dropdown/Dropdown"
import { DropdownProps } from "lib/Dropdown/types"
import { FieldValues, UseControllerProps, useController } from "react-hook-form"

export const FormDropdown = <T extends FieldValues, V, K extends boolean>(
  props: UseControllerProps<T> & Omit<DropdownProps<V, K>, "onChange" | "value">
) => {
  const { defaultValue, multiple, control, name, rules, shouldUnregister, ...rest } = props
  const {
    field: { onChange, value },
  } = useController({
    control,
    name,
    rules,
    defaultValue,
    shouldUnregister,
  })
  return <Dropdown multiple={multiple as any} onChange={onChange} value={value} {...rest} />
}
