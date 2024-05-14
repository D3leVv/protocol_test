"use client"
import { InputField, InputFieldProps } from "components/InputField/InputField"
import { FieldValues, UseControllerProps, useController } from "react-hook-form"

export const FormInputField = <T extends FieldValues>(props: UseControllerProps<T> & InputFieldProps) => {
  const { rules, name, control, defaultValue, shouldUnregister, ...rest } = props
  const {
    field: { ref, onChange, onBlur, value },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules:
      !rules && rest.required
        ? {
            required: `${name} is required`,
          }
        : rules,
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
