import { Popover } from "@headlessui/react"
import { EyeDropperIcon, TrashIcon } from "@heroicons/react/24/outline"
import { AnimatePresence } from "framer-motion"
import hexRgb from "hex-rgb"
import { useCustomPopper } from "hooks/popper"
import { Placeholder } from "lib/Placeholder/Placeholder"
import { Tooltip } from "lib/Tooltip/Tooltip"
import { HexAlphaColorPicker } from "react-colorful"
import { InputField } from "../InputField/InputField"
import { HSLColorPicker } from "./HSLColorpicker"
import { SavedColors } from "./SavedColors"
import { ColorFormatEnum, ColorPickerType } from "./types"
import { useColorpicker } from "./useColorpicker"

export type ColorpickerProps = {
  color?: ColorPickerType
  onChange: (color?: ColorPickerType) => void
  label?: string
  id?: string
  required?: boolean
  placeholder?: string
  tooltipText?: string
}

const renameKeys = (obj: { red: number; green: number; blue: number; alpha: number }) => {
  return {
    r: obj.red,
    g: obj.green,
    b: obj.blue,
    a: obj.alpha,
  }
}

export const Colorpicker = ({ onChange, id, tooltipText, placeholder, color = "#000000" }: ColorpickerProps) => {
  // current color in rgba
  const c = hexRgb(color)
  const currColor = renameKeys(c)

  const {
    cFormat,
    colorInput,
    colorOpacity,
    handleCFormat,
    handleColorOnchange,
    handleInputChange,
    handleOpacityOnChange,
  } = useColorpicker({ color, onChange, currColor })

  const { setPopperElement, setReferenceElement, styles, attributes } = useCustomPopper({
    poperPlacement: "bottom-start",
  })
  return (
    <>
      <Popover data-tooltip-id="Colorpicker" id={id || "colorpicker"}>
        {({ open }) => (
          <>
            <Popover.Button
              ref={setReferenceElement}
              role="button"
              aria-label="pick color"
              className="sm:text-sm relative flex h-[38px] w-full cursor-default items-center justify-between rounded-md border border-secondary-300 bg-background px-3 py-1 text-left shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            >
              {currColor ? (
                <span
                  style={{
                    background: `rgba(${currColor?.r}, ${currColor?.g}, ${currColor?.b}, ${currColor?.a})`,
                  }}
                  className="block h-[25px] w-[108px] rounded-[4px] border"
                />
              ) : (
                placeholder && <Placeholder>{placeholder}</Placeholder>
              )}
              <div className="flex gap-2">
                {color !== "#000000" && (
                  <div
                    role="button"
                    aria-label="trash"
                    onClick={(e) => {
                      //prevent the popover from closing or open
                      e.stopPropagation()
                      onChange("#000000")
                    }}
                  >
                    <TrashIcon role="button" className="h-4 w-4 cursor-pointer stroke-[2px] text-secondary-500" />
                  </div>
                )}

                <EyeDropperIcon className="h-4 w-4 cursor-pointer stroke-[2px] text-secondary-500" />
              </div>
            </Popover.Button>
            <AnimatePresence>
              {open && (
                <Popover.Panel
                  ref={setPopperElement}
                  style={{
                    ...styles,
                    maxWidth: "auto !important",
                    maxHeight: "auto !important",
                  }}
                  {...attributes.popper}
                  role="region"
                  aria-label="color picker"
                  static
                  className="text-base absolute z-10 flex max-h-[400px] w-full max-w-[264px] flex-col items-center justify-center gap-4 overflow-hidden rounded-md border border-secondary-100 bg-background px-0 py-4 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <section className="flex w-full items-center justify-center gap-y-2">
                    <HexAlphaColorPicker
                      className="xs:!w-[232px] !max-h-[200px] !min-w-[85%]"
                      color={color}
                      onChange={handleColorOnchange}
                    />
                  </section>
                  <div className="flex w-full items-center gap-2 px-4">
                    <HSLColorPicker colorFormat={cFormat || ColorFormatEnum["hex"]} colorFormatChange={handleCFormat} />
                    <InputField
                      id="text-input"
                      role="textbox"
                      aria-label="color code"
                      tooltipText={colorInput}
                      className="w-full truncate"
                      value={colorInput}
                      onChange={handleInputChange}
                    />
                    <InputField
                      id="opacity"
                      tooltipText={`${
                        String(colorOpacity).length > 2 ? Number(colorOpacity).toFixed(2) : colorOpacity
                      }%`}
                      step="0.01"
                      min={0}
                      max={1}
                      role="opacity"
                      aria-label="opacity"
                      type="number"
                      className="w-[80%]"
                      inputFieldClassName="!pr-2 !pl-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      value={String(colorOpacity).length > 2 ? Number(colorOpacity).toFixed(2) : colorOpacity}
                      onChange={handleOpacityOnChange}
                      // Update the handler function
                    />
                  </div>
                  <SavedColors handleColorChange={handleColorOnchange} />
                </Popover.Panel>
              )}
            </AnimatePresence>
          </>
        )}
      </Popover>
      <Tooltip contentId="Colorpicker" title={tooltipText} />
    </>
  )
}
