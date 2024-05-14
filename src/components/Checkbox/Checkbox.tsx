"use client"
import { default as classNames, default as cn } from "classnames"
import React, { InputHTMLAttributes, ReactNode } from "react"

export type CheckboxProps = {
  explanationText?: string
  error?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  label?: ReactNode
  wrapperClassName?: string
} & InputHTMLAttributes<HTMLInputElement>

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ explanationText, wrapperClassName, className, label, error, id, ...rest }, ref) => {
    return (
      <div className={cn(`flex  ${label ? "items-start" : "items-center"}`, wrapperClassName)} role="checkbox">
        <input
          {...rest}
          ref={ref}
          id={id}
          className={classNames(
            "h-4 w-4 !translate-y-0 cursor-pointer rounded border bg-background text-primary-500 ring-offset-2 focus:ring-1 focus:ring-primary-500 disabled:text-secondary-500",
            {
              "!border-red-500 focus:!ring-red-500 focus:ring-offset-0": error,
            },
            { "mt-0.5": label },
            className
          )}
          type="checkbox"
        />
        {label && (
          <label htmlFor={id} className="flex cursor-pointer flex-col justify-center">
            <div
              className={classNames(
                "text-body2/regular ml-2 flex select-none items-center gap-2 text-foreground first-letter:capitalize",
                error && "text-red-500"
              )}
            >
              {label}
              {rest.required && <span className="text-red-500">*</span>}
            </div>
            {explanationText && (
              <span className="text-body3/regular ml-2 mt-1 block text-secondary-500">{explanationText}</span>
            )}
          </label>
        )}
      </div>
    )
  }
)
Checkbox.displayName = "Checkbox"
