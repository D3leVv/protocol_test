'use client'
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  isAfter,
  isBefore,
  isSameMonth,
  isValid,
  startOfWeek,
} from 'date-fns'
import { MotionConfig, Variants, motion } from 'framer-motion'
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import useMeasure from 'react-use-measure'
import { dateFormatMonth, parseFormatMonth } from 'utils'
import { CalendarCell } from './CalendarCell'
import { CalendarHead } from './CalendarHead'
import { Meeting } from './types'

const DURATION = 0.2
export type CalendarProps = {
  value: Date | null
  onChange: (date: Date | null) => void
  meetings?: Meeting[]
  close?: () => void
  minDate?: Date
  maxDate?: Date
  children?: ReactNode
  id?: string
  range?: boolean
}

const variants: Variants = {
  initial: (direction: 'left' | 'right' | null) => ({
    opacity: 0,
    x: direction === 'left' ? -100 : 100,
  }),
  animate: {
    opacity: 1,
    x: 0,
  },
}

export const Calendar = (props: CalendarProps) => {
  const { minDate, maxDate, value, onChange, close, id } = props
  const focusRef = useRef<HTMLDivElement>(null)
  const today = minDate
    ? add(minDate, { days: 1 })
    : maxDate
      ? add(maxDate, { days: -1 })
      : new Date()
  const [ref, { height }] = useMeasure()
  const [currentMonth, setCurrentMonth] = useState(
    dateFormatMonth(value || today),
  )

  const [direction, setDirection] = useState<'left' | 'right' | null>(null)

  const [focusDate, setFocusDate] = useState(value || today)

  const firstDayCurrentMonth = parseFormatMonth(currentMonth)

  const isValidDate = useCallback(
    (date: Date) => {
      if (minDate && isBefore(date, minDate)) {
        return false
      }
      if (maxDate && isAfter(date, maxDate)) {
        return false
      }
      return true
    },
    [minDate, maxDate],
  )

  const prevMonth = () => {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
    setCurrentMonth(dateFormatMonth(firstDayNextMonth))
    setFocusDate(firstDayNextMonth)
    setDirection('right')
  }

  const nextMonth = () => {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
    setCurrentMonth(dateFormatMonth(firstDayNextMonth))
    setFocusDate(firstDayNextMonth)
    setDirection('left')
  }

  const handleNextDate = () => {
    const nextDate = add(focusDate, { days: 1 })
    if (!isSameMonth(nextDate, firstDayCurrentMonth)) {
      nextMonth()
    }
    setFocusDate(nextDate)
  }

  const handlePrevDate = () => {
    const prevDate = add(focusDate, { days: -1 })
    if (!isSameMonth(prevDate, firstDayCurrentMonth)) {
      prevMonth()
    }
    setFocusDate(prevDate)
  }

  const handleNextWeek = () => {
    const nextWeek = add(focusDate, { weeks: 1 })
    if (!isSameMonth(nextWeek, firstDayCurrentMonth)) {
      nextMonth()
    }
    setFocusDate(nextWeek)
  }

  const handlePrevWeek = () => {
    const prevWeek = add(focusDate, { weeks: -1 })
    if (!isSameMonth(prevWeek, firstDayCurrentMonth)) {
      prevMonth()
    }
    setFocusDate(prevWeek)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      handlePrevDate()
    }
    if (event.key === 'ArrowRight') {
      handleNextDate()
    }
    if (event.key === 'ArrowUp') {
      handlePrevWeek()
    }
    if (event.key === 'ArrowDown') {
      handleNextWeek()
    }
    if (event.key === 'Enter' || event.key === ' ') {
      if (isValidDate(focusDate)) {
        onChange(focusDate)
        setFocusDate(focusDate)
      }
    }
    if (event.key === 'Escape') {
      close && close()
    }
  }

  const days = eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth, { weekStartsOn: 1 }),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth), { weekStartsOn: 1 }),
  })

  useEffect(() => {
    if (value && isValidDate(value)) {
      setCurrentMonth(dateFormatMonth(value))
      setFocusDate(value)
      focusRef.current?.focus()
    }
  }, [value, isValidDate])

  useEffect(() => {
    if (focusRef.current && focusDate) {
      focusRef.current.focus()
    }
  }, [focusRef, focusDate])

  return (
    <MotionConfig transition={{ duration: DURATION }}>
      <motion.div initial={false} animate={{ height: height || 'auto' }}>
        <div
          ref={ref}
          className="relative flex flex-col gap-y-2 overflow-hidden rounded-lg border border-secondary-100 bg-background p-6 shadow-sm"
        >
          <CalendarHead
            height={height}
            variants={variants}
            direction={direction}
            currentMonth={currentMonth}
            prevMonth={prevMonth}
            nextMonth={nextMonth}
          />
          <div
            autoFocus
            onKeyDown={handleKeyDown}
            role="grid"
            className="focus:outline-none"
            tabIndex={0}
            id={id + '-grid'}
            ref={focusRef}
          >
            <motion.div
              variants={variants}
              initial={height ? 'initial' : false}
              animate="animate"
              key={currentMonth}
              tabIndex={-1}
              custom={direction}
              className={`grid grid-cols-7 gap-0.5`}
            >
              {days.map((day) => (
                <CalendarCell
                  value={value}
                  onChange={onChange}
                  today={today}
                  close={close}
                  focusDate={focusDate}
                  isValidDate={isValid}
                  setFocusDate={setFocusDate}
                  day={day}
                  firstDayCurrentMonth={firstDayCurrentMonth}
                  key={day.toISOString()}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </MotionConfig>
  )
}
