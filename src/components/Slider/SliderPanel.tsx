"use client"
import classNames from "classnames"
import { Modal } from "components/Modal/Modal"
import React from "react"
import { useSliderContext } from "./context"

type SliderPanelProps = {
  children:
    | React.ReactNode
    | React.ReactNode[]
    | (({ close, open }: { close: () => void; open: boolean }) => React.ReactNode | React.ReactNode[])
  className?: string
}

export const SliderPanel = ({ children, className }: SliderPanelProps) => {
  const { open, close, openSlider, slideDirection } = useSliderContext()
  const transitionProps =
    slideDirection === "left"
      ? {
          enter: "transition ease-in-out duration-300 transform",
          enterFrom: "-translate-x-full",
          enterTo: "translate-x-0",
          leave: "transition ease-in-out duration-300 transform",
          leaveFrom: "translate-x-0",
          leaveTo: "-translate-x-full",
        }
      : {
          enter: "transition ease-in-out duration-300 transform",
          enterFrom: "translate-x-full",
          enterTo: "translate-x-0",
          leave: "transition ease-in-out duration-300 transform",
          leaveFrom: "translate-x-0",
          leaveTo: "translate-x-full",
        }

  return (
    <Modal isOpen={open} closeModal={close} openModal={openSlider}>
      <Modal.ContentWrapper
        transitionProps={transitionProps}
        dialogClassName="min-h-screen lg:my-0 !max-w-[448px] lg:min-w-0"
        className={classNames(slideDirection === "left" ? "!justify-start" : "!justify-end", className)}
      >
        {typeof children === "function" ? children({ open, close }) : children}
      </Modal.ContentWrapper>
    </Modal>
  )
}
