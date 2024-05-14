import { InputField, InputFieldProps } from "lib/InputField/InputField"
import { useFormattedMessage } from "lib/Translate/FormattedMessage"
import { FieldValues, UseControllerProps, useController } from "react-hook-form"

export const FormInputField = <T extends FieldValues>(props: UseControllerProps<T> & InputFieldProps) => {
  const { rules, name, control, defaultValue, shouldUnregister, ...rest } = props
  const { formatMessage } = useFormattedMessage()
  const {
    field: { ref, onChange, onBlur, value },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules:
      !rules && rest.required ? { required: formatMessage({ id: "VALIDATION.REQUIRED", values: { name } }) } : rules,
    defaultValue,
  })

  return (
    <InputField
      {...rest}
      ref={ref}
      required={rules?.required ? true : false || rest.required}
      onChange={(e) => {
        if (rest.type === "number") {
          onChange(parseInt(e.target.value))
        } else {
          onChange(e.target.value)
        }
      }}
      onBlur={onBlur}
      value={value}
      name={name}
      error={error?.message}
    />
  )
}
