'use client'
import classNames from 'classnames'
import { format, isSameDay, isSameMonth, isToday } from 'date-fns'
import { Dispatch, SetStateAction } from 'react'
import { dateFormatStandard } from 'utils'

type CalendarCellProps = {
  day: Date
  isValidDate: (date: Date | null) => boolean
  onChange: (date: Date | null) => void
  setFocusDate: Dispatch<SetStateAction<Date>>
  value: Date | null
  today: Date
  firstDayCurrentMonth: Date
  focusDate: Date
  close?: () => void
}

export const CalendarCell = ({
  day,
  isValidDate,
  onChange,
  setFocusDate,
  value,
  today,
  firstDayCurrentMonth,
  focusDate,
  close,
}: CalendarCellProps) => {
  return (
    <button
      role="gridcell"
      aria-selected={isSameDay(day, value || today)}
      tabIndex={-1}
      onClick={() => {
        if (isValidDate(day)) {
          close && close()
          onChange(day)
          setFocusDate(day)
        }
      }}
      type="button"
      className={classNames(
        !isValidDate(day) && 'cursor-default opacity-60 hover:bg-transparent',
        isSameDay(day, focusDate) && 'border border-primary-500',
        !isSameDay(day, value || today) && isToday(day) && 'text-primary-500',
        !isSameDay(day, value || today) &&
          !isToday(day) &&
          isSameMonth(day, firstDayCurrentMonth) &&
          'text-foreground hover:bg-primary-200',
        !isSameDay(day, value || today) &&
          !isToday(day) &&
          !isSameMonth(day, firstDayCurrentMonth) &&
          'text-secondary-400',
        // isSameDay(day, value || today) && isToday(day) && "bg-green-500",
        value &&
          isSameDay(day, value) &&
          'bg-primary-500 text-white hover:bg-primary-700',
        (isSameDay(day, value || today) || isToday(day)) && 'font-semibold',
        `text-body2/regular mx-auto flex h-8 w-8 items-center justify-center rounded-[4px] p-1 focus:outline-none`,
      )}
    >
      <time dateTime={dateFormatStandard(day)}>{format(day, 'd')}</time>
    </button>
  )
}
