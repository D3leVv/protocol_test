"use client"
import { Tooltip } from "components/Tooltip/Tooltip"
import { PropsWithChildren } from "react"

import { CheckIcon, ClockIcon, XMarkIcon } from "@heroicons/react/20/solid"
import classNames from "classnames"

export enum StatusEnum {
  Green = "green",
  Red = "red",
  Orange = "orange",
  Blue = "blue",
  None = "",
}

export type StatusProps = PropsWithChildren<{
  status: StatusEnum
  tooltipText?: string
  tooltipPosition?: "top" | "bottom" | "left" | "right"
  withIcon?: boolean
  className?: string
}>

export const Status = ({ children, tooltipPosition, tooltipText, status, withIcon, className }: StatusProps) => {
  const currStatus =
    status === "green"
      ? "bg-green-500"
      : status === "red"
        ? "bg-red-500"
        : status === "blue"
          ? "bg-blue-500"
          : "bg-orange-500"

  const currStatusWithIcon =
    status === "green" ? (
      <div
        role="status"
        aria-label={"Positive"}
        className={classNames(
          "flex h-3.5 w-3.5 items-center justify-center rounded-full bg-green-500 stroke-2",
          className
        )}
      >
        <CheckIcon className="h-3 w-3 text-white " />
      </div>
    ) : status === "red" ? (
      <div
        role="status"
        aria-label={"In Progress"}
        className={classNames("flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-500 stroke-2")}
      >
        <XMarkIcon className="h-3 w-3 text-white" />
      </div>
    ) : status === "blue" ? (
      <div
        role="status"
        aria-label={"Information"}
        className={classNames("flex h-3.5 w-3.5 items-center justify-center rounded-full bg-blue-500 stroke-2")}
      >
        <CheckIcon className="h-3 w-3 text-white" />
      </div>
    ) : (
      <ClockIcon role="status" aria-label={"Negative"} className="h-[17px] w-[17px] bg-background text-orange-500 " />
    )

  const Normal = (
    <span
      role="status"
      className={classNames(currStatus, "inline-block h-2 w-2 flex-shrink-0 rounded-full", className)}
    />
  )

  return (
    <>
      <div
        data-tooltip-id="Status"
        data-tooltip-content={tooltipText}
        data-tooltip-place={tooltipPosition}
        className=""
      >
        <div className="flex items-center gap-x-2 text-foreground">
          {withIcon ? currStatusWithIcon : Normal}

          {children ? <p>{children}</p> : null}
        </div>
      </div>
      <Tooltip contentId="Status" title={tooltipText} />
    </>
  )
}
