"use client"
import { Combobox } from "@headlessui/react"
import { Placement } from "@popperjs/core"
import classNames from "classnames"
import { CustomErrorMessage } from "components/Form/FormComponents/CustomErrorMessage"
import { Tooltip } from "components/Tooltip/Tooltip"
import { useCustomPopper } from "hooks/popper"
import React, { Children, cloneElement, isValidElement } from "react"
import { FieldError } from "react-hook-form"
import { EnsureArray } from "types/generalTypes"
import { NoInfer } from "../../../types"
import { ComboBoxInput } from "./ComboBoxInput"
import { ComboBoxInputWrapper } from "./ComboBoxInputWrapper"
import { ComboBoxLabel } from "./ComboBoxLabel"
import { ComboBoxList } from "./ComboBoxList"
import { ComboBoxOption } from "./ComboBoxOption"

export type ComboBoxProps<T> = {
  children?: React.ReactNode
  placeholder?: string
  multiple?: boolean
  value?: T
  className?: string
  success?: string
  required?: boolean
  poperPlacement?: Placement
  by?: (a: T, b: T) => boolean
  disabled?: boolean
  name?: string
  error?: FieldError
  tooltip?: string
  onChange?(value: NoInfer<T> | EnsureArray<NoInfer<T>> | null): void
}

export const ComboBox = <T,>(props: ComboBoxProps<T>) => {
  const { attributes, setPopperElement, setReferenceElement, styles, update } = useCustomPopper({
    poperPlacement: props.poperPlacement || "bottom-start",
  })

  return (
    <Combobox
      data-tooltip-id="ComboBox"
      data-tooltip-content={props.tooltip}
      value={props.value}
      onChange={(val) => {
        props.onChange && props.onChange(val)
        update && update()
      }}
      by={props.by}
      multiple={props.multiple as any}
    >
      {({ open }) => (
        <div className={classNames("relative", props.className)}>
          {Children.map(props.children, (child) => {
            if (!isValidElement(child)) {
              return child
            } else if (child.type === ComboBoxLabel) {
              return cloneElement(child, {
                ...child.props,
                name: props.name,
                disabled: props.disabled,
                required: props.required,
                error: props.error,
              })
            } else if (child.type === ComboBoxInputWrapper) {
              return cloneElement(child, {
                ...child.props,
                open,
                placeholder: props.placeholder,
                disabled: props.disabled,
                error: props.error,
                success: props.success,
                value: props.value,
                ref: setReferenceElement,
              })
            } else if (child.type === ComboBoxList) {
              return cloneElement(child, {
                ...child.props,
                open,
                ref: setPopperElement,
                attributes: attributes.popper,
                style: styles,
                update: update,
              })
            } else if (child.type === ComboBoxInput) {
              return cloneElement(child, {
                ...child.props,
                open,
                placeholder: props.placeholder,
                disabled: props.disabled,
                error: props.error,
                value: props.value,
              })
            } else {
              return child
            }
          })}
          <div className="absolute top-[99%]">
            <CustomErrorMessage errorMessage={props.error?.message} />
          </div>
          <Tooltip contentId="ComboBox" title={props.tooltip} />
        </div>
      )}
    </Combobox>
  )
}

ComboBox.Label = ComboBoxLabel
ComboBox.Input = ComboBoxInput
ComboBox.InputWrapper = ComboBoxInputWrapper
ComboBox.List = ComboBoxList
ComboBox.Option = ComboBoxOption
