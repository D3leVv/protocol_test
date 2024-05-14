'use client'
import React, { useContext } from 'react'
import { AccordionContext } from './context'

interface Props {
  index: number
  children:
    | React.ReactNode
    | React.ReactNode[]
    | (({ isOpen }: { isOpen: boolean }) => React.ReactNode | React.ReactNode[])
  className?: string | (({ isOpen }: { isOpen: boolean }) => string)
}

export const AccordionButton = ({ index, children, className }: Props) => {
  const { openIndexes, toggleIndex } = useContext(AccordionContext)
  const isOpen = openIndexes.includes(index)

  return (
    <button
      type="button"
      className={
        (typeof className === 'function' ? className({ isOpen }) : className,
        'text-foreground')
      }
      onClick={() => toggleIndex(index)}
    >
      {typeof children === 'function' ? children({ isOpen }) : children}
    </button>
  )
}
