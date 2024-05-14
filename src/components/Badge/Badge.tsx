import classNames from "classnames"
import { Tooltip } from "lib/Tooltip/Tooltip"
import { PropsWithChildren } from "react"

import { getContrastColor } from "utils"

import { MouseEvent } from "react"

export type BadgeProps = PropsWithChildren<{
  tooltipText?: string
  tooltipPosition?: "top" | "bottom" | "left" | "right"
  variant?: "info" | "success" | "warning" | "error" | "neutral" | "custom"
  color?: string
  filled?: boolean
  rounded?: boolean
  className?: string
  onClick?: (e: MouseEvent<HTMLDivElement>) => void
}>

export const Badge = ({
  tooltipPosition,
  tooltipText,
  variant = "neutral",
  rounded = false,
  onClick,
  className,
  color,
  filled = true,
  children,
}: BadgeProps) => {
  const v = filled
    ? variant === "info"
      ? "bg-blue-500 text-white"
      : variant === "success"
        ? "bg-green-500 text-white"
        : variant === "warning"
          ? "bg-yellow-500 text-white"
          : variant === "error"
            ? "bg-red-500 text-white"
            : "bg-gray-500 text-white"
    : variant === "info"
      ? "border border-blue-500 text-primary-500"
      : variant === "success"
        ? "border border-green-500 text-green-500"
        : variant === "warning"
          ? "border border-yellow-500 text-yellow-500"
          : variant === "error"
            ? "border border-red-500 text-red-500"
            : "border border-gray-500 text-secondary-500"

  const r = rounded ? "rounded-[50px]" : "rounded-[4px]"

  return (
    <>
      <div
        style={
          variant === "custom"
            ? {
                backgroundColor: color,
                color: getContrastColor(color || ""),
              }
            : {}
        }
        role="status"
        onClick={onClick}
        arial-label={variant}
        data-tooltip-id="Badge"
        data-tooltip-content={tooltipText}
        data-tooltip-place={tooltipPosition}
        className={classNames(
          "relative inline-flex shrink-0 items-center justify-center   px-2 py-[1px] text-center text-body2/regular shadow-sm",
          r,
          v,
          className
        )}
      >
        {children}
      </div>
      <Tooltip contentId="Badge" title={tooltipText} />
    </>
  )
}
