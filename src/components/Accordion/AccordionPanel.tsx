'use client'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useContext } from 'react'
import { AccordionContext } from './context'

interface AccordionPanelProps {
  index: number
  customKey?: string
  children:
    | React.ReactNode
    | React.ReactNode[]
    | (({ isOpen }: { isOpen: boolean }) => React.ReactNode | React.ReactNode[])
}

export const AccordionPanel = ({
  index,
  children,
  customKey,
}: AccordionPanelProps) => {
  const { openIndexes } = useContext(AccordionContext)
  const isOpen = openIndexes.includes(index)

  return (
    <AnimatePresence key={customKey} initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isOpen ? 'auto' : 0,
            opacity: isOpen ? 1 : 0,
          }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full overflow-hidden"
          key={index}
        >
          {typeof children === 'function' ? children({ isOpen }) : children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
