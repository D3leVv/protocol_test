import classNames from "classnames"
import { Checkbox, CheckboxProps } from "lib/Checkbox/Checkbox"
import { FieldError } from "lib/Form/Form"
import { Ref, forwardRef } from "react"

export type CheckboxGroupProps = {
  options: CheckboxProps[]
  className?: string
  error?: string
  name: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const CheckboxGroup = forwardRef((porps: CheckboxGroupProps, ref: Ref<HTMLInputElement>) => {
  const { options, className, error, onChange, ...rest } = porps
  return (
    <div className={classNames("flex flex-col justify-center gap-y-4", className)}>
      {options.map((option, index) => {
        return (
          <Checkbox
            {...option}
            onChange={onChange}
            key={JSON.stringify(option.value) + index}
            error={error}
            ref={ref}
          />
        )
      })}
      <FieldError name={rest.name} />
    </div>
  )
})
