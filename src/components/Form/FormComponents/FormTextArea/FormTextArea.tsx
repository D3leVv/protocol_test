import { Textarea, TextareaProps } from "lib/Textarea/Textarea"
import { FieldValues, UseControllerProps, useController } from "react-hook-form"

export const FormTextArea = <T extends FieldValues>(props: UseControllerProps<T> & TextareaProps) => {
  const { name, rules, defaultValue, shouldUnregister, value, control, ...rest } = props
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    rules,
    defaultValue,
    control,
    shouldUnregister,
  })

  return <Textarea {...field} {...rest} error={error?.message} />
}
