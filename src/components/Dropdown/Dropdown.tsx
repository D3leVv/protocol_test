import { Combobox } from "@headlessui/react"
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline"
import classNames from "classnames"
import { AnimatePresence, motion } from "framer-motion"
import { useCustomPopper } from "hooks/popper"
import { DropdownProps } from "lib/Dropdown/types"
import { CustomErrorMessage } from "lib/Form/FormComponents/CustomErrorMessage"
import { CheckedIcon } from "lib/Icons/CheckIcon"
import { UncheckedIcon } from "lib/Icons/UncheckIcon"
import { InputField, mapIcons } from "lib/InputField/InputField"
import { Label } from "lib/Label/Label"
import { isDisabled } from "lib/Select/Select"
import { TagButtonTemplate } from "lib/TagButtonTemplate/TagButtonTemplate"
import { ReactNode, useState } from "react"

export const Dropdown = <T, M extends boolean>(props: DropdownProps<T, M>) => {
  const {
    label = "Select",
    options,
    poperPlacement = "bottom-start",
    renderProp,
    disabledOptions = [],
    error,
    keyName,
    required,
    prefixIcons,
    suffixIcons = [],
    placeholder = "Select",
    success,
    multiple,
    value,
    onChange,
    ...rest
  } = props
  const [query, setQuery] = useState("")
  const { styles, attributes, setPopperElement, setReferenceElement } = useCustomPopper({ poperPlacement })

  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) => {
          const optionName = keyName ? (option[keyName] as string) : (option as string)
          return String(optionName).toLowerCase().replace(/\s+/g, "").includes(query.toLowerCase().replace(/\s+/g, ""))
        })
  const renderTemplate = (val: typeof value) => {
    if (!val || (multiple && Array.isArray(val) && val.length === 0)) {
      return
    }
    if (multiple && Array.isArray(val) && val.length > 0) {
      return (
        <>
          {val
            .map((v) => (
              <Combobox.Option
                as={TagButtonTemplate}
                onClick={(e: any) => e.stopPropagation()}
                value={v}
                className="focus:ring-none cursor-pointer focus:outline-none focus:ring-0 focus:ring-transparent focus:ring-offset-0 focus:ring-offset-transparent"
                key={keyName && v[keyName] ? (v[keyName] as any) : v}
              >
                <span className="overflow-hidden">{renderProp(v)}</span>
              </Combobox.Option>
            ))
            .splice(0, 3)}
          {val.length > 3 ? <span className="">+ {val.length - 3}</span> : null}
        </>
      )
    }
    if (!multiple && !Array.isArray(val)) return renderProp(val)
  }
  return (
    <Combobox
      as="div"
      by={(a, b) =>
        keyName && a && b && !Array.isArray(a) && !Array.isArray(b) && typeof a === "object" && typeof b === "object"
          ? a[keyName] === b[keyName]
          : a === b
      }
      className="relative h-full w-full"
      onChange={onChange as any}
      multiple={multiple as any}
      value={value}
      {...rest}
    >
      {({ open }) => (
        <>
          <Combobox.Label as={Label} id={rest.id + "-input"} label={label} />
          {!multiple ? (
            <>
              <Combobox.Input
                autoComplete="off"
                prefixIcon={prefixIcons}
                suffixIcon={[
                  ...suffixIcons,
                  <>
                    <ChevronUpIcon className="hidden h-4 w-4 ui-open:block" />
                    <ChevronDownIcon className="h-4 w-4 ui-open:hidden" />
                  </>,
                ]}
                ref={setReferenceElement}
                as={InputField}
                displayValue={(value: T) => renderProp(value)}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => setQuery(e.target.value)}
                error={error}
                id={rest.id + "-input"}
              />
            </>
          ) : (
            <Combobox.Button
              as="div"
              ref={setReferenceElement}
              onClick={(e) => e.preventDefault()}
              className={({ value }) =>
                classNames(
                  "relative inline-flex min-h-[38px] w-full flex-grow-0 items-center truncate rounded-md border border-secondary-300 bg-background px-3 py-2 text-body2/regular text-foreground ui-open:border-primary-500 focus:outline-primary-500 focus:invalid:outline-red-500 disabled:cursor-not-allowed disabled:bg-secondary-300/60 disabled:!text-opacity-50 disabled:opacity-50",
                  error && "!border-red-500 focus:!outline-red-500",
                  multiple && value && "!py-1"
                )
              }
            >
              {({ value }) => (
                <>
                  {prefixIcons && <div className="flex items-center gap-3 pr-2">{mapIcons(prefixIcons)}</div>}
                  <div className="flex w-full flex-1 flex-wrap items-center gap-x-2 !p-0">
                    {value && value.length > 0 && (
                      <div
                        className={classNames(
                          "flex max-w-full items-center gap-x-1 gap-y-0.5",
                          !multiple && value && "!gap-x-0 !truncate !p-0"
                        )}
                      >
                        {renderTemplate(value)}
                      </div>
                    )}
                    <Combobox.Input
                      placeholder={!value ? placeholder : undefined}
                      autoComplete="off"
                      displayValue={(value: T) => renderProp(value)}
                      onChange={(e) => setQuery(e.target.value)}
                      id={rest.id + "-input"}
                      className={classNames(
                        "h-full min-h-[28px] rounded-md border-none bg-transparent !px-0 !py-0 focus:ring-0",
                        value && value.length < 1 ? "w-full" : "w-auto"
                      )}
                    />
                  </div>
                  {suffixIcons && (
                    <div className="absolute inset-y-0 right-8 flex items-center gap-3 ">{mapIcons(suffixIcons)}</div>
                  )}
                  <Combobox.Button className="absolute right-[13px] h-4 w-4 ">
                    <ChevronDownIcon className="ui-open:hidden" />
                    <ChevronUpIcon className="hidden ui-open:block" />
                  </Combobox.Button>
                </>
              )}
            </Combobox.Button>
          )}
          <AnimatePresence>
            {open && (
              <Combobox.Options
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
                {filteredOptions.map((option) => (
                  <Option
                    multiple={multiple}
                    disabled={isDisabled(option, disabledOptions, keyName)}
                    key={
                      (keyName && (option[("id" as keyof typeof option) || keyName] as any)) ||
                      (typeof option === "string" ? option : "")
                    }
                    value={option}
                  >
                    {renderProp(option)}
                  </Option>
                )) ?? <div>No options</div>}
              </Combobox.Options>
            )}
          </AnimatePresence>
          <CustomErrorMessage errorMessage={error} id={rest.id} />
        </>
      )}
    </Combobox>
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
    <Combobox.Option
      disabled={disabled}
      className={classNames(
        "inline-flex w-full cursor-pointer items-center justify-between gap-x-3 rounded-md px-3 py-2 text-left text-foreground ui-selected:bg-primary-500 ui-selected:text-white ui-active:bg-primary-600 ui-active:text-white ui-disabled:cursor-not-allowed ui-disabled:text-gray-300"
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
    </Combobox.Option>
  )
}
