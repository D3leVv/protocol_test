import Color from "color"
import { useState } from "react"
import { RgbaColor } from "react-colorful"
import { ColorFormatEnum, ColorPickerType } from "./types"

// Regex patterns for color formats
const colorPatterns = {
  hex: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
  rgb: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
  rgba: /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(0|1|0\.\d{1,})\)$/,
  hsl: /^hsl\((\d{1,3}),\s*(\d{1,3}%),\s*(\d{1,3}%)\)$/,
  hsla: /^hsla\((\d{1,3}),\s*(\d{1,3}%),\s*(\d{1,3}%),\s*(0|1|0\.\d{1,})\)$/,
}

export type ColorFormatType = keyof typeof colorPatterns

// Add color prefix if missing
const addColorPrefixIfNeeded = (value: string): string => {
  if (value.startsWith("#") || value.startsWith("rgb") || value.startsWith("hsl")) {
    return value
  }

  const colorFormats: ColorFormatType[] = ["hex", "rgb", "rgba", "hsl", "hsla"]
  for (const format of colorFormats) {
    if (colorPatterns[format].test(`#${value}`)) {
      return `#${value}`
    }
    if (colorPatterns[format].test(`rgb(${value})`)) {
      return `rgb(${value})`
    }
    if (colorPatterns[format].test(`hsl(${value})`)) {
      return `hsl(${value})`
    }
    if (colorPatterns[format].test(`rgba(${value})`)) {
      return `rgba(${value})`
    }
    if (colorPatterns[format].test(`hsla(${value})`)) {
      return `hsla(${value})`
    }
  }
  return value
}

const isColorValid = (color: string): boolean => {
  return Object.values(colorPatterns).some((pattern) => pattern.test(color))
}

export interface useColorpickerProps {
  color: ColorPickerType
  onChange: (color?: ColorPickerType) => void
  currColor: RgbaColor
}

const useColorpicker = ({ color, onChange, currColor: curr }: useColorpickerProps) => {
  const currColor = Color(color)
  // state for color input
  const [colorInput, setColorInput] = useState(currColor.hex())
  const [colorOpacity, setColorOpacity] = useState(curr?.a ?? 1)
  // state form color format
  const [cFormat, setCFormat] = useState(ColorFormatEnum.hex)
  // Handle color format change
  const handleCFormat = (format?: ColorFormatEnum) => {
    setCFormat(format ?? ColorFormatEnum.hex)
    const c = Color(`rgba(${curr.r ?? 0}, ${curr?.g ?? 0}, ${curr?.b ?? 0}, ${curr.a ?? 1})`)

    setColorInput(format === "hex" ? c.hex() : format === "rgb" ? `${c.string()}` : `${c.hsl()}`)
  }

  // Handle color change from color picker
  const handleColorOnchange = (e?: string) => {
    const c = Color(e)
    onChange(c.hexa())
    setColorInput(c[cFormat]() as string)
    setColorOpacity(c.alpha() ?? 1)
  }

  // Handle color change from input field
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const updatedValue = addColorPrefixIfNeeded(value)

    if (isColorValid(updatedValue)) {
      const newColor = Color(updatedValue)

      onChange(newColor.hex())
    }
    setColorInput(e.target.value)
  }

  const handleOpacityOnChange = (e?: React.ChangeEvent<HTMLInputElement>) => {
    const value = e?.target.value
    if (currColor && value) {
      onChange(currColor.alpha(+value).hexa())
    }
    setColorOpacity(Number(value))
  }

  return {
    colorInput,
    colorOpacity,
    cFormat,
    handleCFormat,
    handleColorOnchange,
    handleInputChange,
    handleOpacityOnChange,
  }
}

export { useColorpicker }
