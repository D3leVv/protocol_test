"use client"
import { ReactNode } from "react"
import { Tooltip as CustomTooltip, ITooltip } from "react-tooltip"

interface TooltipInterface extends ITooltip {
  contentId: string
  className?: string
  style?: React.CSSProperties
  title: string | React.ReactNode
  children?: ReactNode
}

export const Tooltip = ({ contentId, children, place = "top", title, ...rest }: TooltipInterface) => {
  return (
    <div key={contentId} data-tooltip-id={contentId}>
      {children}
      <CustomTooltip
        key={contentId}
        id={contentId}
        place={place}
        {...rest}
        className={"!z-50 !rounded-md !bg-foreground !px-4 !py-2 !text-body3/regular !text-background"}
      >
        {title}
      </CustomTooltip>
    </div>
  )
}
