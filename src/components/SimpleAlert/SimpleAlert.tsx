import { ExclamationTriangleIcon, InformationCircleIcon } from "@heroicons/react/20/solid"
import classNames from "classnames"

const VARIANT_CLASS = {
  info: "bg-blue-200 ",
  error: "bg-red-200 ",
  success: "bg-green-200 ",
  warning: "bg-yellow-200 ",
}

const TEXT_CLASS = {
  info: "text-blue-800",
  error: "text-red-800",
  success: "text-green-800",
  warning: "text-yellow-800",
}

const ICON_CLASS = {
  info: "text-blue-500",
  error: "text-red-500",
  success: "text-green-500",
  warning: "text-yellow-500",
}

export interface SimpleAlertProps {
  text: string
  variant: "info" | "success" | "warning" | "error"
}

export const SimpleAlert = ({ text, variant }: SimpleAlertProps) => {
  const Icon = variant === "warning" || variant === "error" ? ExclamationTriangleIcon : InformationCircleIcon
  return (
    <div className={classNames("flex flex-grow-0 items-center gap-3 rounded-md p-4", VARIANT_CLASS[variant])}>
      <Icon className={`h-8 w-8 text-foreground ${ICON_CLASS[variant]}`} />
      <p className={`text-left text-body2/regular ${TEXT_CLASS[variant]}`}>{text}</p>
    </div>
  )
}
