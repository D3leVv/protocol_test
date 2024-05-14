import classNames from "classnames"
import {
  BUTTON_BASE_CLASSES,
  BUTTON_IMPACT_CLASSES,
  BUTTON_SHAPE_CLASSES,
  BUTTON_SIZE_CLASSES,
} from "lib/Button/constants"
import { Tooltip } from "lib/Tooltip/Tooltip"
import React from "react"
import { CustomLink, CustomLinkProps } from "./CustomLink"

export interface LinkWrapperProps extends CustomLinkProps {
  variant?: "primary" | "secondary" | "text" | "error" | "custom" | "green"
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  focus?: "outline" | "shadow" | "none"
  impact?: "bold" | "none" | "light" | "link"
  disabled?: boolean
  loading?: boolean
  prefixIcon?: React.ReactNode
  shape?: "rounded" | "square" | "pill"
  rounded?: boolean
  square?: boolean
  suffixIcon?: React.ReactNode
  tooltipText?: string
  tooltipPosition?: "top" | "bottom" | "left" | "right"
  bgColor?: string
  textColor?: string
  hoverBgColor?: string
}

export const LinkWrapper = ({
  children,
  className,
  variant = "primary",
  impact = "light",
  shape = "rounded",
  size = "xl",
  disabled = false,
  loading = false,
  prefixIcon,
  suffixIcon,
  tooltipText,
  rounded,
  square,
  tooltipPosition = "top",
  bgColor,
  textColor,
  hoverBgColor,
  id = "link",
  href,
  ...rest
}: LinkWrapperProps) => {
  const resolvedShape = rounded ? "rounded" : square ? "square" : shape
  return (
    <div
      className={classNames(
        BUTTON_BASE_CLASSES,
        BUTTON_SIZE_CLASSES[size],
        BUTTON_IMPACT_CLASSES[variant][impact],
        BUTTON_SHAPE_CLASSES[resolvedShape],
        className
      )}
      data-tooltip-content={tooltipText}
      data-tooltip-place={tooltipPosition}
      data-tooltip-id="Link"
    >
      <CustomLink id={id} href={href} {...rest}>
        {children}
      </CustomLink>
      <Tooltip title={tooltipText} contentId={id} />
    </div>
  )
}
