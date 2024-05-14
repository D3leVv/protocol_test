'use client'
import React, { useState } from 'react'
import { AccordionButton } from './AccordionButton'
import { AccordionItem } from './AccordionItem'
import { AccordionPanel } from './AccordionPanel'
import { AccordionContext } from './context'

interface Props {
  allowMultiple?: boolean
  children: React.ReactNode
  className?: string
  defaultOpen?: number[]
}

export const Accordion = ({ allowMultiple, children, defaultOpen }: Props) => {
  const [openIndexes, setOpenIndexes] = useState<number[]>(defaultOpen || [])

  const toggleIndex = (index: number) => {
    if (allowMultiple) {
      setOpenIndexes((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index],
      )
    } else {
      setOpenIndexes(([prevIndex]) => (prevIndex === index ? [] : [index]))
    }
  }

  return (
    <AccordionContext.Provider
      value={{
        openIndexes,
        toggleIndex,
      }}
    >
      {children}
    </AccordionContext.Provider>
  )
}
Accordion.Item = AccordionItem
Accordion.Button = AccordionButton
Accordion.Panel = AccordionPanel
