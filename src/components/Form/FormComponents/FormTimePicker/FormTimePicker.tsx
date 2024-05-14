import { CustomErrorMessage } from "lib/Form/FormComponents/CustomErrorMessage"
import { TimePicker, TimePickerProps } from "lib/TimePicker/TimePicker"
import { FieldValues, UseControllerProps, useController } from "react-hook-form"

export const FormTimePicker = <T extends FieldValues>(props: UseControllerProps<T> & TimePickerProps) => {
  const { control, name, defaultValue, shouldUnregister, rules, ...rest } = props
  const {
    field: { ref, ...fieldOptions },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue,
    rules,
    shouldUnregister,
  })
  return (
    <div>
      <TimePicker {...fieldOptions} error={error?.message} {...rest} />
      <CustomErrorMessage errorMessage={error?.message} />
    </div>
  )
}
