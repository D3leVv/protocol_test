import classNames from "classnames"

import React, { InputHTMLAttributes } from "react"

import { containerClasses, inputClasses } from "../../utils"
import { FieldError } from "../Form/Form"
import { Label } from "../Label/Label"
import { Tooltip } from "../Tooltip/Tooltip"

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string | React.ReactNode
  prefixIcon?: React.ReactNode | React.ReactNode[]
  suffixIcon?: React.ReactNode | React.ReactNode[]
  success?: string
  error?: string
  required?: boolean
  inputFieldClassName?: string
  tooltipText?: string
  tooltipPosition?: "top" | "bottom" | "left" | "right"
}

export const mapIcons = (icon: React.ReactNode | React.ReactNode[]) => {
  const icons = Array.isArray(icon) ? icon : [icon]
  return icons.map((ico, index) => (
    <span key={index} className="flex h-5 w-5 items-center justify-center">
      {ico}
    </span>
  ))
}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      tooltipPosition,
      tooltipText,
      label,
      prefixIcon,
      suffixIcon,
      success,
      type = "text",
      error,

      className,
      inputFieldClassName,
      required,

      ...rest
    },
    ref
  ) => (
    <>
      <div
        data-tooltip-id="InputField"
        data-tooltip-content={tooltipText}
        data-tooltip-place={tooltipPosition}
        className={classNames(
          containerClasses({
            error: error ? true : false,
            success: success ? true : false,
            disabled: rest.disabled ? true : false,
          }),
          className
        )}
      >
        {label && <Label label={label} id={rest.id} required={required} />}
        <div className="relative flex w-full items-center">
          {prefixIcon && (
            <div className="absolute inset-y-0 left-0 flex items-center gap-3 pl-3">{mapIcons(prefixIcon)}</div>
          )}
          <input
            ref={ref}
            {...rest}
            type={type}
            className={classNames(
              "pl-3 pr-3 outline-none placeholder:text-link1/regular placeholder:text-secondary-400 focus-within:ring-0",
              {
                "!pl-10": prefixIcon,
                "!pr-10": suffixIcon,
              },
              inputClasses({
                error: error ? true : false,
                success: success ? true : false,
                disabled: rest.disabled ? true : false,
              }),
              inputFieldClassName
            )}
          />
          {suffixIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center gap-1 pr-3">{mapIcons(suffixIcon)}</div>
          )}
        </div>
        <FieldError name={rest.name} id={rest.id} />
        {success && <span className="mt-0.5 text-body3/regular text-green-500">{success}</span>}
      </div>
      <Tooltip id="InputField" contentId="InputField" title={tooltipText} />
    </>
  )
)
InputField.displayName = "InputField"
