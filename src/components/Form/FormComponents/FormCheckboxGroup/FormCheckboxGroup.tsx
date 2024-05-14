"use client"
import classNames from "classnames"
import { Checkbox, CheckboxProps } from "components/Checkbox/Checkbox"
import { FieldValues, UseControllerProps, useController } from "react-hook-form"
import { FieldError } from "../../Form"

export type FormCheckboxGroupProps = {
  options: CheckboxProps[]
  className?: string
  error?: string
}

const FormCheckboxGroup = <T extends FieldValues>(props: UseControllerProps<T> & FormCheckboxGroupProps) => {
  const { options, className, ...rest } = props
  const {
    field,
    fieldState: { error },
  } = useController(rest)

  return (
    <div className={classNames("flex flex-col justify-center gap-y-4", className)}>
      {options.map((option, index) => {
        return (
          <Checkbox
            {...option}
            onChange={(e) => {
              if (e.currentTarget.checked) {
                field.onChange([...field.value, String(option.value)])
              } else {
                field.onChange(field.value.filter((value: string) => value !== String(option.value)))
              }
            }}
            key={JSON.stringify(option.value) + index}
            checked={field.value.includes(String(option.value))}
            value={option.value}
            error={error?.message}
            ref={field.ref}
          />
        )
      })}
      <FieldError name={rest.name} />
    </div>
  )
}

export { FormCheckboxGroup }
