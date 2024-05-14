import { Popover } from "@headlessui/react"
import classNames from "classnames"
import { TimePickerButton } from "lib/TimePicker/TimePickerButton"
import { useCallback, useRef } from "react"

type TimePickerPanelProps = {
  hour: string
  minute: string
  handleChangeHour: (currHR: string) => void
  handleChangeMinute: (currMIN: string) => void
  setPopperElement: (element: HTMLElement | null) => void
  attributes: any
  styles: any
  hoursList: number[]
  minutesList: number[]
}

export const TimePickerPanel = ({
  hour,
  minute,
  handleChangeHour,
  handleChangeMinute,
  setPopperElement,
  attributes,
  hoursList,
  minutesList,
  styles,
}: TimePickerPanelProps) => {
  const hoursListRefs = useRef<HTMLButtonElement[]>([])
  const minutesListRefs = useRef<HTMLButtonElement[]>([])
  const currHrIndex = hoursListRefs.current.findIndex((ele) => +ele.value === +hour) || 0
  const currMinIndex = minutesListRefs.current.findIndex((ele) => +ele.value === +minute) || 0

  const addToRefs = useCallback((el: HTMLButtonElement | null, index: number, type: "hour" | "minute") => {
    const refList = type === "hour" ? hoursListRefs : minutesListRefs
    if (!el || refList.current.includes(el)) {
      return
    }
    refList.current.splice(index, 0, el)
  }, [])

  const handleClickHour = (currHR: number) => {
    handleChangeHour(currHR.toString().padStart(2, "0"))
  }

  const handleClickMinute = (currMIN: number) => {
    handleChangeMinute(currMIN.toString().padStart(2, "0"))
  }

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, closePopup: () => void) => {
    const key = e.key
    e.preventDefault()

    const currFocusedArrray = hoursListRefs.current.includes(document.activeElement as HTMLButtonElement)
      ? "hours"
      : "minutes"

    if (key === "ArrowUp") {
      if (currFocusedArrray === "hours") {
        const ele = hoursListRefs.current.at(currHrIndex - 1)
        ele?.click()
        ele?.focus()
      } else {
        const ele = minutesListRefs.current.at(currMinIndex - 1)
        ele?.click()
        ele?.focus()
      }
    } else if (key === "ArrowDown") {
      if (currFocusedArrray === "hours") {
        const ele = hoursListRefs.current.at(currHrIndex + 1)
        ele?.click()
        ele?.focus()
      } else {
        const ele = minutesListRefs.current.at(currMinIndex + 1)
        ele?.click()
        ele?.focus()
      }
    } else if (key === "ArrowLeft") {
      hoursListRefs.current[currHrIndex].focus()
    } else if (key === "ArrowRight") {
      minutesListRefs.current[currMinIndex].focus()
    } else if (key === "Escape" || key === "Enter" || key === " " || key === "Escape") {
      closePopup()
    } else if (key === "Tab") {
      if (hoursListRefs.current.includes(document.activeElement as HTMLButtonElement)) {
        const ele = minutesListRefs.current[currMinIndex]
        ele?.click()
        ele?.focus()
      } else {
        const ele = hoursListRefs.current[currHrIndex]
        ele?.click()
        ele?.focus()
      }
    }
  }

  return (
    <Popover.Panel focus>
      {({ close }) => (
        <div
          ref={setPopperElement}
          {...attributes.popper}
          style={{
            ...styles,
          }}
          className={classNames(
            "text-base absolute z-50 inline-flex h-full max-h-[286px] w-auto justify-between  gap-x-4 rounded-md border border-secondary-100 bg-background shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none "
          )}
        >
          <div
            className=" scrollbar-hide flex max-h-[286px] w-full flex-col items-center gap-y-1 overflow-y-auto"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {hoursList.map((currHR, hrIndex) => {
              const selectedH = +hour === currHR
              return (
                <TimePickerButton
                  handleOnKeyDown={(e) => handleOnKeyDown(e, close)}
                  ref={(ele) => {
                    addToRefs(ele, hrIndex, "hour")

                    selectedH &&
                      ele &&
                      hoursListRefs.current.includes(document.activeElement as HTMLButtonElement) &&
                      ele?.focus()
                  }}
                  key={currHR + "hr"}
                  value={String(currHR)}
                  handleClick={() => handleClickHour(currHR)}
                  isSelect={selectedH}
                />
              )
            })}
          </div>
          <div
            className="scrollbar-hide flex max-h-[286px] w-full flex-col items-center gap-y-1 overflow-y-auto"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {minutesList.map((currMIN, minIndex) => {
              const selectedM = +minute === currMIN

              return (
                <TimePickerButton
                  handleOnKeyDown={(e) => handleOnKeyDown(e, close)}
                  ref={(ele) => {
                    addToRefs(ele, minIndex, "minute")
                  }}
                  key={currMIN + "min"}
                  handleClick={() => handleClickMinute(currMIN)}
                  value={String(currMIN)}
                  isSelect={selectedM}
                />
              )
            })}
          </div>
        </div>
      )}
    </Popover.Panel>
  )
}
