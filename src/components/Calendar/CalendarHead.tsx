"use client"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"
import { Variants, motion } from "framer-motion"

enum WeekDayEnum {
  MON = "Mo",
  TUE = "Tu",
  WEN = "We",
  THU = "Th",
  FRI = "Fr",
  SAT = "Sa",
  SUN = "Su",
}

export type CalendarHeadProps = {
  prevMonth: () => void
  nextMonth: () => void
  currentMonth: string
  variants: Variants
  direction: "left" | "right" | null
  height: number
}

export const CalendarHead = ({
  prevMonth,
  nextMonth,
  currentMonth,
  variants,
  direction,
  height,
}: CalendarHeadProps) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <button
          tabIndex={-1}
          onClick={prevMonth}
          type="button"
          className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-secondary-400 hover:text-secondary-500"
        >
          <span className="sr-only">Previous month</span>
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        <motion.div
          custom={direction}
          key={currentMonth}
          initial={height ? "initial" : false}
          animate="animate"
          variants={variants}
        >
          <h2 className="text-h4 font-semibold text-foreground">{currentMonth}</h2>
        </motion.div>
        <button
          tabIndex={-1}
          onClick={nextMonth}
          type="button"
          className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-secondary-400 hover:text-secondary-500"
        >
          <span className="sr-only">Next month</span>
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <div className="text-body2/medium grid grid-cols-7 gap-x-0.5 text-center leading-6 text-secondary-500">
        {Object.values(WeekDayEnum).map((day, index) => (
          <p key={index} className="p-1">
            {day}
          </p>
        ))}
      </div>
    </>
  )
}
