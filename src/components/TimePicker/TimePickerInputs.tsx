import { MaxMinType, TimeColumn } from "lib/TimePicker/TimePicker"
import { TimePickerInput } from "lib/TimePicker/TimePickerInput"
import { MutableRefObject, useCallback, useRef } from "react"

type TimePickerInputsProps = {
  maxMinValues: MaxMinType
  hour: string
  minute: string
  hrsRef: MutableRefObject<HTMLInputElement | null>
  minuteRef: MutableRefObject<HTMLInputElement | null>
  handleOnChangeMIN: (value: string) => void
  handleOnChangeHR: (value: string) => void
  disabled?: boolean
  error?: boolean
  id: string
  step?: number
}

export const TimePickerInputs = ({
  handleOnChangeHR,
  handleOnChangeMIN,
  hour,
  hrsRef,
  maxMinValues,
  id,
  minute,
  minuteRef,
  step,
  disabled,
}: TimePickerInputsProps) => {
  const justFocused = useRef(false)

  const changeValue = useCallback(
    (column: TimeColumn, increment = true, current?: string, step = 1) => {
      const max = maxMinValues[column].max
      const min = maxMinValues[column].min

      if (!current) {
        if (increment) {
          return min.toString().padStart(2, "0")
        } else {
          return (max - step + 1).toString().padStart(2, "0")
        }
      }
      if (+current + step > max && increment) {
        return min.toString().padStart(2, "0")
      }
      if (+current - step < min && !increment) {
        return (max - step + 1).toString().padStart(2, "0")
      }
      if (increment) {
        return (+current + step).toString().padStart(2, "0")
      } else {
        return (+current - step).toString().padStart(2, "0")
      }
    },
    [maxMinValues]
  )

  const onKeyPressHRS = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      justFocused.current = false
      if (e.key === "ArrowUp") {
        e.preventDefault()
        handleOnChangeHR(changeValue(TimeColumn.Hours, true, hour))
      } else if (e.key === "ArrowDown") {
        e.preventDefault()
        handleOnChangeHR(changeValue(TimeColumn.Hours, false, hour))
      } else if (e.key === "Backspace" || e.key === "Delete") {
        handleOnChangeHR("")
        handleOnChangeMIN("")
      } else if (["ArrowRight", ":"].includes(e.key)) {
        e.preventDefault()
        minuteRef.current?.select()
      }
    },
    [hour, changeValue, minuteRef, handleOnChangeHR, handleOnChangeMIN]
  )

  const onKeyPressMIN = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      justFocused.current = false
      if (e.key === "ArrowUp") {
        e.preventDefault()
        handleOnChangeMIN(changeValue(TimeColumn.Minutes, true, minute, step))
      } else if (e.key === "ArrowDown") {
        e.preventDefault()
        handleOnChangeMIN(changeValue(TimeColumn.Minutes, false, minute, step))
      } else if (e.key === "ArrowLeft") {
        e.preventDefault()
        hrsRef.current?.select()
      } else if (e.key === "Backspace" || e.key === "Delete") {
        e.preventDefault()
        if (e.currentTarget.value) {
          e.currentTarget.value = ""
          handleOnChangeMIN("")
        } else {
          hrsRef.current?.select()
          setTimeout(() => (justFocused.current = false))
        }
      }
    },
    [minute, changeValue, handleOnChangeMIN, hrsRef, step]
  )

  const padAndSetTime = (value: string, type: "hours" | "minutes") => {
    const { min, max } = maxMinValues[type]
    const valueNumber = parseInt(value, 10)
    const paddedValue = valueNumber >= min && valueNumber <= max ? valueNumber.toString().padStart(2, "0") : ""
    if (type === "hours") {
      handleOnChangeHR(paddedValue)
    } else {
      handleOnChangeMIN(paddedValue)
    }
  }

  const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    justFocused.current = true
    e.target.select()
  }
  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (justFocused.current) {
      e.currentTarget.select()
      justFocused.current = false
    }
  }
  return (
    <>
      <TimePickerInput
        key={"one"}
        disabled={disabled}
        id={id + "-hours"}
        onBlur={(e) => padAndSetTime(e.target.value, "hours")}
        placeholder="--"
        onKeyDown={(e) => onKeyPressHRS(e)}
        ref={hrsRef}
        type="number"
        onFocus={onFocus}
        onKeyUp={onKeyUp}
        value={hour}
        min={maxMinValues.hours.min}
        max={maxMinValues.hours.max}
        onChange={(e) => {
          const value = e.target.value.replace(/[^0-9]/g, "")
          if (value.length >= 2) {
            padAndSetTime(value.slice(0, 2), "hours")

            const minute = minuteRef.current
            if (minute) {
              minute.select()
              padAndSetTime(value.slice(2), "minutes")
            }
          } else {
            handleOnChangeHR(value)
          }
        }}
      />
      <span className="absolute left-7 top-[5px]">:</span>
      <TimePickerInput
        id={id + "-minutes"}
        key={"two"}
        disabled={disabled}
        min={+hour === maxMinValues.hours.max ? maxMinValues.minutes.min : 0}
        max={+hour === maxMinValues.hours.max ? maxMinValues.minutes.max : 59}
        placeholder="--"
        type="number"
        onBlur={(e) => padAndSetTime(e.target.value, "minutes")}
        onKeyDown={(e) => onKeyPressMIN(e)}
        ref={minuteRef}
        onFocus={onFocus}
        onKeyUp={onKeyUp}
        value={minute}
        maxLength={
          2 /* only the minutes has max length, since when copy/pasting in hours it can be more than 2 chars */
        }
        className="pl-0.5"
        outerDivClassName="!left-8"
        onChange={(e) => handleOnChangeMIN(e.target.value)}
      />
    </>
  )
}
