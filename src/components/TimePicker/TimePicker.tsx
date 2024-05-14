import { Popover } from "@headlessui/react"
import { ClockIcon } from "@heroicons/react/24/outline"
import classNames from "classnames"
import { useCustomPopper } from "hooks/popper"
import { Label } from "lib/Label/Label"
import { TimePickerInputs } from "lib/TimePicker/TimePickerInputs"
import { TimePickerPanel } from "lib/TimePicker/TimePickerPanel"
import { ReactNode, useCallback, useRef, useState } from "react"

export enum TimeColumn {
  Hours = "hours",
  Minutes = "minutes",
}

enum MinMax {
  Min = "min",
  Max = "max",
}

export enum TimeEnum {
  HOURS_IN_DAY = 24,
  MINUTES_IN_HOUR = 60,
}

export type TimePickerProps = {
  error?: string
  label?: string | ReactNode
  onChange?: (date: Date | null) => void
  value?: Date | null
  minTime?: Date
  maxTime?: Date
  step?: number
  id: string
  disabled?: boolean
  required?: boolean
  placeholder?: string
}
export type MaxMinType = Record<TimeColumn, Record<MinMax, number>>

export const TimePicker = ({
  error,
  label,
  onChange,
  value,
  minTime,
  maxTime,
  required,
  disabled,
  id,
  step = 1,
}: TimePickerProps) => {
  const [hour, setHour] = useState<string>(value ? value.getHours().toString().padStart(2, "0") : "")
  const [minute, setMinute] = useState<string>(value ? value.getMinutes().toString().padStart(2, "0") : "")
  const maxMinValues: MaxMinType = {
    hours: {
      min: minTime ? +minTime?.getHours() : 0,
      max: maxTime ? +maxTime?.getHours() : 23,
    },
    minutes: {
      min: minTime ? +minTime?.getMinutes() : 0,
      max: maxTime ? +maxTime?.getMinutes() : 59,
    },
  }

  const generateList = (count: number, step = 1) => Array.from({ length: count }).map((_, i) => i * step)
  const hoursList = generateList(TimeEnum.HOURS_IN_DAY).filter(
    (h) => h <= maxMinValues.hours.max && h >= maxMinValues.hours.min
  )
  const minutesList = generateList(TimeEnum.MINUTES_IN_HOUR, step)
    .filter((m) => m < TimeEnum.MINUTES_IN_HOUR)
    .filter((m) => {
      if (+hour === maxMinValues.hours.max && (m >= maxMinValues.minutes.max || m <= maxMinValues.minutes.min)) {
        return false
      } else {
        return true
      }
    })

  const minuteRef = useRef<HTMLInputElement>(null)
  const hrsRef = useRef<HTMLInputElement>(null)

  const { attributes, setPopperElement, setReferenceElement, styles } = useCustomPopper({
    poperPlacement: "bottom-start",
  })

  const handleOnChangeMIN = useCallback(
    (min: string) => {
      const currentDate = new Date()

      setMinute(min)
      if (!min) {
        return
      }
      if (onChange) {
        currentDate.setHours(+hour, +min)
        onChange(currentDate)
      }
    },
    [hour, onChange]
  )

  const handleOnChangeHR = (hr: string) => {
    setHour(hr)
    if (onChange && minute) {
      const currentDate = new Date()
      currentDate.setHours(+hr, +minute)
      onChange(currentDate)
    }
  }
  return (
    <Popover>
      <Label label={label} required={required} />
      <div
        id={id}
        onClick={(e) => {
          e.stopPropagation()
          hrsRef.current?.focus()
        }}
        ref={setReferenceElement}
        className={classNames(
          "time-picker relative min-h-[38px] min-w-[100px] rounded-md border border-secondary-100 bg-background",
          {
            "border border-secondary-100": !error,
            "!border-red-500 !ring-red-500  focus:!border-red-500": error,
            "cursor-not-allowed opacity-40": disabled,
          }
        )}
      >
        <TimePickerInputs
          id={id}
          step={Math.floor(step)}
          maxMinValues={maxMinValues}
          disabled={disabled}
          error={Boolean(error)}
          handleOnChangeMIN={handleOnChangeMIN}
          handleOnChangeHR={handleOnChangeHR}
          hour={hour}
          hrsRef={hrsRef}
          minute={minute}
          minuteRef={minuteRef}
        />
        <Popover.Button tabIndex={-1} disabled={disabled} className="group" id={`${id}-popover-button`}>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 ">
            <ClockIcon className="h-5 w-5 rounded-md text-secondary-500 group-focus:ring-2 group-focus:ring-primary-500" />
          </div>
        </Popover.Button>
      </div>

      <TimePickerPanel
        hoursList={hoursList}
        minutesList={minutesList}
        attributes={attributes}
        handleChangeHour={handleOnChangeHR}
        handleChangeMinute={handleOnChangeMIN}
        hour={hour}
        minute={minute}
        setPopperElement={setPopperElement}
        styles={styles}
      />
    </Popover>
  )
}
