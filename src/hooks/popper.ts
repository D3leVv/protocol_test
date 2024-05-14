"use client"
import { Placement } from "@popperjs/core"
import { useState } from "react"
import { usePopper } from "react-popper"

export interface UseCustomPopperProps {
  poperPlacement?: Placement
}

const useCustomPopper = ({ poperPlacement }: UseCustomPopperProps) => {
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null)
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null)
  const { styles, attributes, update, forceUpdate } = usePopper(referenceElement, popperElement, {
    placement: poperPlacement ? poperPlacement : "bottom",
    modifiers: [{ name: "offset", options: { offset: [0, 5] } }],
    strategy: "fixed",
  })
  const offsetWidth = referenceElement?.offsetWidth
  return {
    setReferenceElement,
    setPopperElement,
    popperElement,
    styles: {
      ...styles.popper,
      opacity: offsetWidth ? 1 : 0,
      maxWidth: offsetWidth || 0,
    },
    attributes,
    update,
    forceUpdate,
  }
}

export type UseCustomPopperReturnType = ReturnType<typeof useCustomPopper>

export { useCustomPopper }
