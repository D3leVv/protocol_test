"use client"
import { Button, ButtonProps } from "components/Button/Button"
import { Tooltip } from "components/Tooltip/Tooltip"
import React from "react"
import { useSliderContext } from "./context"

type SliderButtonProps = {
  children:
    | React.ReactNode
    | React.ReactNode[]
    | (({ open, close }: { open: boolean; close: () => void }) => React.ReactNode | React.ReactNode[])
} & ButtonProps<"button">

export const SliderButton = ({ children, ...rest }: SliderButtonProps) => {
  const { open, close, openSlider, tooltipText } = useSliderContext()

  return (
    <Button onClick={open ? close : openSlider} data-tooltip-content={tooltipText} data-tooltip-id={"Slider"} {...rest}>
      {typeof children === "function" ? children({ open, close }) : children}

      <Tooltip contentId="Slider" title={tooltipText} />
    </Button>
  )
}
