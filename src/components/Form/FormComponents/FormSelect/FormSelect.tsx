"use client"
import { Select } from "components/Select/Select"
import { SelectProps } from "components/Select/types"
import { FieldValues, UseControllerProps, useController } from "react-hook-form"

export const FormSelect = <T extends FieldValues, M extends boolean>(
  props: UseControllerProps<T> & Omit<SelectProps<T, M>, "onChange" | "value" | "error">
) => {
  const {
    control,
    name,
    rules,
    defaultValue,
    shouldUnregister,
    renderProp,
    options,
    keyName,
    disabledOptions,
    poperPlacement,
    suffixIcons,
    prefixIcons,
    placeholder,
    required,
    label,
    id,
    disabled,
    multiple,
  } = props
  const {
    field: { value, onChange },
    fieldState,
  } = useController({ control, name, rules, defaultValue, shouldUnregister })
  console.log({ value })
  return (
    <Select
      value={value}
      onChange={onChange}
      label={label}
      id={id}
      multiple={multiple}
      disabled={disabled}
      required={required}
      placeholder={placeholder}
      suffixIcons={suffixIcons}
      poperPlacement={poperPlacement}
      prefixIcons={prefixIcons}
      disabledOptions={disabledOptions}
      keyName={keyName}
      options={options}
      renderProp={renderProp}
      error={fieldState.error?.message}
    />
  )
}
