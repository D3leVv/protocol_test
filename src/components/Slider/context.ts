import { createContext, useContext } from "react"

type Context = {
  open: boolean
  close: () => void
  openSlider: () => void
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
}

export const SliderContext = createContext<Context | undefined>(undefined)

export const useSliderContext = () => {
  const context = useContext(SliderContext)
  if (!context) {
    throw new Error("useSliderPanel must be used within a SliderProvider")
  }
  return context
}
