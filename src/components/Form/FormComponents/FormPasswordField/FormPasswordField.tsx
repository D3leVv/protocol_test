import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"
import { InputField, InputFieldProps } from "lib/InputField/InputField"
import { useState } from "react"
import { FieldValues, UseControllerProps, useController } from "react-hook-form"

export const FormPasswordField = <T extends FieldValues>(
  props: UseControllerProps<T> & InputFieldProps & { showPasswordButton?: boolean }
) => {
  const [showPassword, setShowPassword] = useState(false)

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  const { rules, name, control, defaultValue, shouldUnregister, ...rest } = props
  const {
    field: { ref, onChange, onBlur, value },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  })

  return (
    <InputField
      type={showPassword ? "text" : "password"}
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
      suffixIcon={
        showPassword ? (
          <EyeIcon
            className={`cursor-pointer hover:text-foreground ${showPassword && "text-foreground"}`}
            onClick={handlePasswordVisibility}
          />
        ) : (
          <EyeSlashIcon
            className={`cursor-pointer hover:text-foreground ${showPassword && "text-foreground"}`}
            onClick={handlePasswordVisibility}
          />
        )
      }
    />
  )
}
