import { DatePicker, DatePickerProps } from "lib/DatePicker/DatePicker"
import { FieldValues, UseControllerProps, useController } from "react-hook-form"

export const FormDatePicker = <T extends FieldValues>(
  props: UseControllerProps<T> & Omit<DatePickerProps, "value" | "onChange" | "error">
) => {
  const { control, name, rules, defaultValue, shouldUnregister, ...rest } = props
  const {
    field: { onChange, value },
    fieldState,
  } = useController({
    control,
    name,
    rules,
    defaultValue,
    shouldUnregister,
  })

  return <DatePicker value={value} onChange={onChange} {...rest} error={fieldState.error?.message} />
}
