import {
  DefaultSelectProps,
  DetermineSelectProps,
  NoKey,
  WithKey,
} from 'components/Select/types'

export type DropdownProps<T, M extends boolean> = DetermineSelectProps<T, M> &
  (T extends object ? WithKey<T> : NoKey) &
  DefaultSelectProps<T>
