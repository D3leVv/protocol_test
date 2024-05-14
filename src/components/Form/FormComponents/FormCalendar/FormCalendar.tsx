import { Calendar, CalendarProps } from "lib/Calendar/Calendar"
import { FieldValues, UseControllerProps, useController } from "react-hook-form"

export const FormCalendar = <T extends FieldValues>(
  props: UseControllerProps<T> & Omit<CalendarProps, "value" | "onChange">
) => {
  const { control, name, rules, defaultValue, shouldUnregister, children, ...rest } = props
  const {
    field: { onChange, value },
  } = useController({
    control,
    name,
    rules,
    defaultValue,
    shouldUnregister,
  })
  return <Calendar onChange={onChange} value={value} {...rest} />
}
