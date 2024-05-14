import classNames from "classnames"
import { forwardRef, ReactNode } from "react"
import { FieldError } from "react-hook-form"
import { addPropsToChildren, containerClasses } from "utils"

interface InputWrapperInterface {
  children: ReactNode
  error?: FieldError
  disabled?: boolean
  success?: string
  className?: string
}

export const ComboBoxInputWrapper = forwardRef<HTMLDivElement, InputWrapperInterface>(
  ({ className, error, success, disabled, children }, ref) => (
    <div
      ref={ref}
      className={classNames(
        containerClasses({
          error: !!error,
          success: !!success,
          disabled: !!disabled,
        }),
        "relative",
        className
      )}
    >
      {addPropsToChildren({
        children,
        props: {
          error,
          disabled,
          success,
        },
      })}
    </div>
  )
)
ComboBoxInputWrapper.displayName = "ComboBoxInputWrapper"
