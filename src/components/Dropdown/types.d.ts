import { DefaultSelectProps, DetermineSelectProps, NoKey, WithKey } from "lib/Select/types"

export type DropdownProps<T, M extends boolean> = DetermineSelectProps<T, M> &
  (T extends object ? WithKey<T> : NoKey) &
  DefaultSelectProps<T>
