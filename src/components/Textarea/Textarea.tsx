"use client"
import classNames from "classnames"

import { FieldError } from "components/Form/Form"
import { Label } from "components/Label/Label"
import { Tooltip } from "components/Tooltip/Tooltip"
import { forwardRef, TextareaHTMLAttributes } from "react"
import { containerClasses } from "utils"

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  tooltipText?: string
  tooltipPosition?: "top" | "bottom" | "left" | "right"
  success?: string
  error?: string
  label?: string | React.ReactNode
  textareaClassName?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      tooltipPosition,
      tooltipText,
      label,
      success,
      error,
      className,
      textareaClassName,
      required,
      id = "textarea",
      rows = 3,
      ...rest
    },
    ref
  ) => (
    <>
      <div
        role="tree"
        data-tooltip-id="Textarea"
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
        {label && <Label label={label} />}
        <div className="">
          <textarea
            style={{
              WebkitTapHighlightColor: "transparent",
            }}
            {...rest}
            rows={rows}
            id={id}
            ref={ref}
            className={classNames(
              "placeholder:text-body2/regular w-full rounded-md border border-secondary-100 bg-background py-1.5 text-foreground  outline-none focus:ring-primary-500",
              {
                "border-red-500 focus:!border-red-500   focus:ring-red-500": error,
                "border-green-500 focus:!border-green-500": success,
                "cursor-not-allowed opacity-40": rest.disabled,
              },

              textareaClassName
            )}
          />
        </div>

        <FieldError name={rest.name} />

        {success && <span className="text-body3/regular text-green-500 ">{success}</span>}
      </div>

      <Tooltip contentId={id} delayShow={500} title={tooltipText} />
    </>
  )
)
Textarea.displayName = "Textarea"
