import { Checkbox, CheckboxProps } from "lib/Checkbox/Checkbox"
import { FieldError } from "lib/Form/Form"
import { useId } from "react-aria"
import { FieldValues, UseControllerProps, useController } from "react-hook-form"

export const FormCheckbox = <T extends FieldValues>(props: UseControllerProps<T> & CheckboxProps) => {
  const { className, children, onChange, defaultValue, ...rest } = props
  const {
    field,
    fieldState: { error },
  } = useController({ ...rest, defaultValue })
  const id = useId(props.id)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target

    if (!checked) {
      return field.onChange(false)
    }
    if (!rest.value) {
      return field.onChange(checked)
    } else {
      return field.onChange(e.target.value)
    }
  }
  return (
    <div className="flex w-auto flex-col">
      <Checkbox
        id={id}
        checked={field.value}
        value={field.value}
        onChange={handleChange}
        error={error?.message}
        ref={field.ref}
        className={className}
        {...rest}
      >
        {props.children}
      </Checkbox>
      <FieldError name={field.name} id={id} />
    </div>
  )
}
