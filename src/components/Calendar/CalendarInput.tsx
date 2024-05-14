import { CalendarIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { isDate, isValid } from "date-fns"
import { CustomErrorMessage } from "lib/Form/FormComponents/CustomErrorMessage"
import { forwardRef } from "react"
import { checkAndParseDateString } from "utils"
import { InputField, InputFieldProps } from "../InputField/InputField"

export const CalendarInput = forwardRef<
  HTMLInputElement,
  Omit<InputFieldProps, "value" | "onChange"> & {
    handleOpen: () => void
    handleClose: () => void
    inputValue: string
    handleInputChange: (value: string) => void
    clearable?: boolean
    open: boolean
    onChange: (date: Date | null) => void
    value: Date | null
    id?: string
  }
>(
  (
    {
      handleOpen,
      open,
      handleClose,
      suffixIcon,
      clearable = true,
      error,
      disabled,
      placeholder,
      inputValue,
      handleInputChange,
      value,
      onChange,
      id = "date-picker",
      ...rest
    },
    ref
  ) => {
    return (
      <>
        <InputField
          onClick={handleOpen}
          ref={ref}
          error={error}
          id={id + "-input"}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              handleClose()
            }
            if (e.key === "ArrowDown") {
              e.preventDefault()
              document.getElementById(id + "-grid")?.focus()
            }
            if (e.key === "ArrowDown") {
              e.preventDefault()
              document.getElementById(id + "-grid")?.focus()
            }
          }}
          placeholder={placeholder}
          {...rest}
          value={inputValue}
          onChange={(e) => {
            const value = e.target.value
            const date = checkAndParseDateString(value)
            if (isDate(date) && isValid(date)) {
              onChange(new Date(date))
            }

            handleInputChange(value)
          }}
          suffixIcon={[
            clearable && value && (
              <button key="close" tabIndex={-1} id={id + "-clear"} disabled={disabled}>
                <XMarkIcon
                  onClick={() => {
                    onChange(null)
                    handleInputChange("")
                  }}
                  className="h-5 w-5 "
                />
              </button>
            ),
            <button
              tabIndex={-1}
              onClick={!open ? handleOpen : handleClose}
              type="button"
              className="rounded-full p-1 hover:bg-foreground/10"
            >
              {suffixIcon || <CalendarIcon className="mb-0.5 h-5 w-5 select-none focus:outline-none" />}
            </button>,
          ].filter(Boolean)}
        />
        <CustomErrorMessage errorMessage={error} />
      </>
    )
  }
)
CalendarInput.displayName = "CalendarInput"
