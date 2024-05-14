"use client"
import { useModal } from "components/Modal/Modal"
import React from "react"
import { SliderButton } from "./SliderButton"
import { SliderPanel } from "./SliderPanel"
import { SliderTitle } from "./SliderTitle"
import { SliderContext } from "./context"

export interface SliderProps {
  title?: string
  tooltipText?: string
  tooltipPosition?: "top" | "bottom" | "left" | "right"
  slideDirection?: "left" | "right"

  actions?: {
    cancel?: {
      label: string
      onClick: () => void
    }
    confirm: {
      label: string
      onClick: () => void
    }
  }
  children:
    | React.ReactNode
    | React.ReactNode[]
    | (({ close, open }: { close: () => void; open: boolean }) => React.ReactNode | React.ReactNode[])
}

export const Slider = ({
  title,
  tooltipPosition,
  tooltipText,
  children,
  actions,
  slideDirection = "right",
}: SliderProps) => {
  const modalMethods = useModal()
  return (
    <SliderContext.Provider
      value={{
        actions,
        open: modalMethods.isOpen,
        openSlider: modalMethods.openModal,
        close: modalMethods.closeModal,
        slideDirection,
        title,
        tooltipPosition,
        tooltipText,
      }}
    >
      {typeof children === "function"
        ? children({
            open: modalMethods.isOpen,
            close: modalMethods.closeModal,
          })
        : children}
    </SliderContext.Provider>
  )
}

Slider.Button = SliderButton
Slider.Panel = SliderPanel
Slider.Title = SliderTitle
