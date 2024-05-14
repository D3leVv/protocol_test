import { ReactNode } from "react"
import { Theme, ToastPosition, toast } from "react-toastify"

interface Props {
  variant?: AlertVariant
  message?: React.ReactNode
  autoClose?: number | false
  position?: ToastPosition
  icon?: ReactNode
}

export const CONTEXT_CLASS = {
  success: "!bg-green-200 !text-green-500",
  error: "!bg-red-200 !text-red-500",
  info: "!bg-blue-200 !text-blue-500",
  warning: "!bg-orange-200 !text-orange-500",
  default: "!bg-background !text-foreground !shadow-md",
  dark: "!bg-background !text-secondary-300",
}

export const PROGRESS_CLASS = {
  success: "bg-green-500 ",
  error: "!bg-red-500 ",
  info: "bg-blue-500 ",
  warn: "bg-orange-500 ",
  default: "bg-primary-500 ",
  dark: "bg-background text-white",
}
export enum AlertVariant {
  INFO = "info",
  SUCCESS = "success",
  WARN = "warn",
  ERROR = "error",
  DARK = "dark",
}

const toastConfig = (
  props: Props
): {
  theme: Theme
  autoClose?: number | false
  position?: ToastPosition
  hideProgressBar: boolean
  icon?: any
} => ({
  theme: "colored",
  autoClose: props.autoClose || 5000,
  hideProgressBar: true,
  position: props.position,
  icon: props.icon,
})

export const notification = {
  info: (props: Props) => toast.info(props.message, toastConfig(props)),
  success: (props: Props) => toast.success(props.message, toastConfig(props)),
  warn: (props: Props) => toast.warn(props.message, toastConfig(props)),
  error: (props: Props) => toast.error(props.message, toastConfig(props)),
  dark: (props: Props) => toast.dark(props.message, toastConfig(props)),
}
