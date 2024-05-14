import { Combobox } from "@headlessui/react"
import classNames from "classnames"
import React, { ReactNode } from "react"
import { addPropsToChildren } from "utils"

interface Props<T> {
  children:
    | ReactNode
    | ReactNode[]
    | (({
        value,
        active,
        disabled,
        selected,
      }: {
        value: T
        active?: boolean
        disabled?: boolean
        selected?: boolean
      }) => ReactNode | ReactNode[])
  value: T
  className?: string
  disabled?: boolean
  style?: React.CSSProperties
}

export const ComboBoxOption = <T,>({ children, ...props }: Props<T>) => (
  <Combobox.Option
    {...props}
    className={({ active, selected, disabled }) =>
      classNames(
        active ? "bg-foreground/10" : "",
        selected ? "cursor-default bg-foreground/10" : "",
        "relative cursor-pointer select-none first-letter:capitalize ",
        disabled && "cursor-not-allowed "
      )
    }
  >
    {({ active, disabled, selected }) => (
      <>
        {typeof children === "function"
          ? children({
              value: props.value,
              active,
              disabled,
              selected,
            })
          : addPropsToChildren({
              children,
              props: {
                active,
                disabled,
                selected,
              },
            })}
      </>
    )}
  </Combobox.Option>
)
