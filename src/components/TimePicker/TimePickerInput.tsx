"use client"
import { forwardRef, InputHTMLAttributes, Ref } from "react"

type TimePickerInputProps = {
  outerDivClassName?: string
} & InputHTMLAttributes<HTMLInputElement>

export const TimePickerInput = forwardRef(
  ({ outerDivClassName, ...rest }: TimePickerInputProps, ref: Ref<HTMLInputElement>) => {
    return (
      <div
        className={`absolute left-2 top-0 flex h-full min-h-[38px] w-[20px] items-center justify-center ${outerDivClassName} `}
      >
        <input
          onClick={(e) => {
            e.stopPropagation()
          }}
          placeholder="--"
          ref={ref}
          {...rest}
          className={`h-full max-h-[20px] w-full max-w-[20px] cursor-default border-none bg-transparent p-0 pl-[1px] text-foreground caret-transparent selection:bg-primary-200 selection:text-foreground placeholder:pl-1 placeholder:text-body1/regular placeholder:text-foreground focus:bg-blue-200 focus:outline-none focus:ring-0 focus-visible:bg-primary-200 focus-visible:outline-none ${rest.className}`}
        />
      </div>
    )
  }
)

TimePickerInput.displayName = "TimePickerInput"
