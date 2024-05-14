import { Combobox } from "@headlessui/react"
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline"
import classNames from "classnames"
import { mapIcons } from "lib/InputField/InputField"
import React, { InputHTMLAttributes, ReactNode } from "react"
import { FieldError } from "react-hook-form"
import { inputClasses } from "utils"

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string
  disabled?: boolean
  error?: FieldError
  displayValue?(value: string | string[]): string
  onChange(e: React.ChangeEvent<HTMLInputElement>): void
  required?: boolean
  success?: string
  prefixIcon?: ReactNode | ReactNode[]
}

export const ComboBoxInput = ({
  placeholder,
  disabled,
  onChange,
  displayValue,
  required,
  prefixIcon,
  maxLength,
  ...props
}: Props) => (
  <Combobox.Button as="div" className={classNames("h-full w-full", disabled && "pointer-events-none opacity-40")}>
    {prefixIcon && (
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
        {mapIcons(prefixIcon)}
      </div>
    )}
    <Combobox.Input
      id={props.id}
      placeholder={placeholder}
      autoComplete="off"
      displayValue={displayValue}
      className={classNames(
        inputClasses({
          error: !!props.error,
          success: !!props.success,
          disabled: !!disabled,
        }),
        prefixIcon && "pl-10"
      )}
      onChange={onChange}
      required={required}
      maxLength={maxLength}
    />
    {props.children}
    <Combobox.Button className={classNames("absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 ")}>
      {({ open }) => (
        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
          {open ? (
            <ChevronUpIcon className="h-4 w-4 text-foreground " aria-hidden="true" />
          ) : (
            <ChevronDownIcon className="h-4 w-4 text-secondary-500 " aria-hidden="true" />
          )}
        </span>
      )}
    </Combobox.Button>
  </Combobox.Button>
)
