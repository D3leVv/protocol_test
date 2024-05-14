import { Placement } from "@popperjs/core"
import { LabelProps } from "components/Label/Label"
export type DefaultSelectProps<T> = {
  poperPlacement?: Placement
  disabled?: boolean
  suffixIcons?: React.ReactNode[]
  prefixIcons?: React.ReactNode[]
  placeholder?: string
  disabledOptions?: T[]
  error?: string
  renderProp: (option: T) => ReactNode
  options: T[]
  name?: string
  success?: string
} & Partial<LabelProps>

export type WithKey<T> = {
  keyName: keyof T
}

export type NoKey = {
  keyName?: never
}

export type SingleSelectProps<T> = {
  value?: T
  onChange?(val: T): void
  multiple?: false
}

export type MultipleSelectProps<T> = {
  value?: T[]
  onChange?(val: T[]): void
  multiple?: true
}

export type DetermineSelectProps<T, M extends boolean> = M extends true ? MultipleSelectProps<T> : SingleSelectProps<T>

export type SelectProps<T, M extends boolean> = DetermineSelectProps<T, M> &
  (T extends object ? WithKey<T> : NoKey) &
  DefaultSelectProps<T>
