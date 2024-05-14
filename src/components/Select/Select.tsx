import { Listbox } from "@headlessui/react"
import { CheckIcon } from "@heroicons/react/24/outline"
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid"
import classNames from "classnames"
import { AnimatePresence, motion } from "framer-motion"
import { useCustomPopper } from "hooks/popper"
import { CustomErrorMessage } from "lib/Form/FormComponents/CustomErrorMessage"
import { CheckedIcon } from "lib/Icons/CheckIcon"
import { UncheckedIcon } from "lib/Icons/UncheckIcon"
import { mapIcons } from "lib/InputField/InputField"
import { Label as CustomLabel } from "lib/Label/Label"
import { Placeholder } from "lib/Placeholder/Placeholder"
import { TagButtonTemplate } from "lib/TagButtonTemplate/TagButtonTemplate"
import { ReactNode } from "react"
import { SelectProps } from "./types"

export const Select = <T, M extends boolean>({
  label,
  prefixIcons,
  required,
  id = "select",
  multiple = false,
  options,
  keyName,
  disabledOptions = [],
  renderProp,
  poperPlacement = "bottom-start",
  suffixIcons,
  error,
  placeholder = "Select",
  value,
  onChange,
  ...rest
}: SelectProps<T, M>) => {
  const { styles, attributes, setPopperElement, setReferenceElement } = useCustomPopper({ poperPlacement })

  const renderTemplate = (val: typeof value) => {
    if (!val || (multiple && Array.isArray(val) && val.length === 0)) {
      return <Placeholder>{placeholder}</Placeholder>
    }
    if (multiple && Array.isArray(val) && val.length > 0) {
      return (
        <>
          {val
            .map((v) => (
              <Listbox.Option
                as={TagButtonTemplate}
                onClick={(e: any) => e.stopPropagation()}
                value={v}
                className="focus:ring-none focus:outline-none focus:ring-0 focus:ring-transparent focus:ring-offset-0 focus:ring-offset-transparent"
                key={keyName && v[keyName] ? (v[keyName] as any) : v}
              >
                <span className="overflow-hidden">{renderProp(v)}</span>
              </Listbox.Option>
            ))
            .splice(0, 3)}
          {val.length > 3 ? <span className="">+ {val.length - 3}</span> : null}
        </>
      )
    }
    if (!multiple && !Array.isArray(val)) return renderProp(val)
  }
  return (
    <Listbox
      by={(a: T, b: T) => (keyName && a && b ? a[keyName] === b[keyName] : a === b)}
      value={value}
      onChange={onChange}
      {...rest}
      multiple={multiple}
      as="div"
      className="relative select-none"
    >
      {({ open }) => (
        <>
          <Listbox.Label as={CustomLabel} label={label} id={id} required={required} />
          <Listbox.Button
            id={id}
            ref={setReferenceElement}
            className={({ value }) =>
              classNames(
                "relative inline-flex min-h-[40px] w-full items-center truncate rounded-md border border-secondary-300 bg-background px-3 py-2 pr-10 text-body2/regular text-foreground ui-open:border-primary-500 focus:outline-primary-500 focus:invalid:outline-red-500 disabled:cursor-not-allowed disabled:bg-secondary-300/60 disabled:!text-opacity-50 disabled:opacity-50",
                error && "!border-red-500 focus:!outline-red-500",
                multiple && value && "!py-1"
              )
            }
          >
            {({ value }) => (
              <>
                {prefixIcons && <div className="flex items-center gap-3 pr-2">{mapIcons(prefixIcons)}</div>}
                <div
                  className={classNames(
                    "flex w-full flex-wrap items-center gap-x-1 gap-y-0.5",
                    !multiple && value && "!gap-x-0 !truncate !p-0"
                  )}
                >
                  {renderTemplate(value)}
                </div>
                {suffixIcons && (
                  <div className="absolute inset-y-0 right-8 flex items-center gap-3 pl-3">{mapIcons(suffixIcons)}</div>
                )}
                <ChevronDownIcon className="absolute right-2 h-4 w-4 ui-open:hidden" />
                <ChevronUpIcon className="absolute right-2 hidden h-4 w-4 ui-open:block" />
              </>
            )}
          </Listbox.Button>

          <AnimatePresence>
            {open && (
              <Listbox.Options
                static
                as={motion.ul}
                ref={setPopperElement}
                style={{
                  ...styles,
                  maxHeight: "auto !important",
                }}
                {...attributes}
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                className="z-20 flex w-full flex-col gap-2 overflow-hidden rounded-md border border-secondary-300 bg-background px-1 py-2.5 text-foreground shadow-lg"
              >
                {options?.map((option) => (
                  <Option
                    multiple={multiple}
                    disabled={isDisabled(option, disabledOptions, keyName)}
                    key={(keyName && (option[keyName] as any)) || (typeof option === "string" ? option : "")}
                    value={option}
                  >
                    {renderProp(option)}
                  </Option>
                )) ?? <div>No options</div>}
              </Listbox.Options>
            )}
          </AnimatePresence>
          <CustomErrorMessage errorMessage={error} id={id} />
        </>
      )}
    </Listbox>
  )
}

const Option = <T,>({
  value,
  children,
  disabled,
  icon,
  multiple,
}: {
  value: T
  children: ReactNode
  multiple?: boolean
  disabled?: boolean
  icon?: ReactNode
}) => {
  return (
    <Listbox.Option
      disabled={disabled}
      className={classNames(
        "inline-flex w-full cursor-pointer items-center justify-between gap-x-3 rounded-md px-3 py-2 text-left text-foreground ui-selected:bg-primary-500 ui-selected:text-white ui-active:bg-primary-500 ui-active:text-white ui-disabled:cursor-not-allowed ui-disabled:text-gray-300"
      )}
      value={value}
    >
      <div className="flex items-center gap-2">
        {icon && <span className="h-5 w-5">{icon}</span>}

        {multiple && (
          <>
            <UncheckedIcon className="hidden ui-selected:block" /> <CheckedIcon className="ui-selected:hidden" />
          </>
        )}
        <span className="first-letter:capitalize">{children}</span>
      </div>

      <CheckIcon className="text-white-500 h-5 w-5 opacity-0 ui-selected:opacity-100" />
    </Listbox.Option>
  )
}
export const isDisabled = <T,>(option: T, disabledOptions: T[], keyName?: keyof T) => {
  if (disabledOptions.length < 1) return false
  if (keyName) {
    return disabledOptions?.some((disabledOption) => disabledOption[keyName] === option[keyName])
  }
  return disabledOptions?.some((disabledOption) => disabledOption === option)
}
