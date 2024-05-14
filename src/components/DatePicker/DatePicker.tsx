"use client"
import classNames from "classnames"
import { Calendar, CalendarProps } from "components/Calendar/Calendar"
import { CalendarInput } from "components/Calendar/CalendarInput"
import { Label } from "components/Label/Label"
import { AnimatePresence, motion } from "framer-motion"
import { useClickOutside } from "hooks/clickOutside"
import { useCustomPopper } from "hooks/popper"
import { useRef, useState } from "react"
import { dateFormatStandard } from "utils"

export type DatePickerProps = CalendarProps & {
  children?: React.ReactNode
  className?: string
  label?: string
  required?: boolean
  placeholder?: string
  id?: string
  autoCloseOnClick?: boolean
  clearable?: boolean
  error?: string
}

export const DatePicker = (props: DatePickerProps) => {
  const { styles, attributes, setPopperElement, setReferenceElement } = useCustomPopper({
    poperPlacement: "bottom-start",
  })
  const divRef = useRef<HTMLDivElement>(null)
  const [inputValue, setInputValue] = useState(props.value ? dateFormatStandard(props.value) : "")
  const handleInputChange = (value: string) => {
    setInputValue(value)
  }
  const [open, setOpen] = useState(false)
  const {
    label,
    onChange,
    value,
    minDate,
    maxDate,
    className,
    autoCloseOnClick = true,
    id = "date-picker",
    children,
    placeholder,
    error,
    ...rest
  } = props

  useClickOutside(divRef, () => {
    if (open) {
      handleClose()
    }
  })

  const handleClose = () => {
    setOpen(false)
  }
  const handleOpen = () => {
    setOpen(true)
  }

  return (
    <div ref={divRef}>
      <Label label={label} id={id + "-input"} required={props.required} />
      <CalendarInput
        value={value}
        id={id + "-input"}
        onChange={onChange}
        open={open}
        autoComplete="off"
        inputValue={inputValue}
        handleInputChange={handleInputChange}
        ref={setReferenceElement}
        placeholder={placeholder}
        error={error}
        handleOpen={handleOpen}
        handleClose={handleClose}
      />
      <AnimatePresence>
        {open && (
          <div
            ref={setPopperElement}
            style={{
              ...styles,
              maxWidth: "auto !important",
              maxHeight: "auto !important",
            }}
            {...attributes.popper}
            className={classNames("z-30 w-auto ", className)}
          >
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Calendar
                close={autoCloseOnClick ? handleClose : undefined}
                {...rest}
                value={value}
                minDate={minDate}
                maxDate={maxDate}
                onChange={(date) => {
                  onChange(date)
                  date && handleInputChange(dateFormatStandard(date))
                }}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
