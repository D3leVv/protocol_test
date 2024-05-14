"use client"
import classNames from "classnames"
import { forwardRef, Ref } from "react"

type TimePickerButtonProps = {
  value: string
  isSelect: boolean
  handleClick: () => void
  handleOnKeyDown?: (e: React.KeyboardEvent<HTMLButtonElement>) => void
  isDisabled?: boolean
}

export const TimePickerButton = forwardRef(
  (
    { value, isDisabled, isSelect, handleClick, handleOnKeyDown }: TimePickerButtonProps,
    ref: Ref<HTMLButtonElement>
  ) => {
    return (
      <button
        value={value}
        ref={ref}
        onKeyDown={handleOnKeyDown}
        disabled={Boolean(isDisabled)}
        type="button"
        className={classNames(
          "m-1 max-h-[34px] min-h-[38px] min-w-[38px] max-w-[34px] rounded-md border-transparent p-1 !text-body2/regular focus:bg-primary-500  focus:text-white  focus:ring-1  focus:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          isSelect ? "bg-primary-500 text-white hover:bg-primary-700" : "text-foreground hover:bg-secondary-50"
        )}
        onClick={handleClick}
      >
        {value}
      </button>
    )
  }
)
TimePickerButton.displayName = "TimePickerButton"
