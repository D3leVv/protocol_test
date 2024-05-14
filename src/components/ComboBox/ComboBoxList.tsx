import { Combobox, Portal } from "@headlessui/react"
import classNames from "classnames"
import { AnimatePresence, motion } from "framer-motion"
import { CSSProperties, forwardRef } from "react"

interface Props {
  children: any
  open?: boolean
  className?: string
  style?: CSSProperties
  attributes?: {
    [key: string]:
      | {
          [key: string]: string
        }
      | undefined
  }
  id?: string
}

export const ComboBoxList = forwardRef<any, Props>(({ id, children, className, open, style, attributes }, ref) => {
  return (
    <Portal>
      <AnimatePresence>
        {open && (
          <Combobox.Options
            id={id}
            style={style}
            ref={ref}
            {...attributes}
            className={classNames(
              "text-base z-20 w-full overflow-auto rounded-md border border-secondary-100 bg-background py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ",
              className
            )}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{
                opacity: 0,
              }}
              className="w-full"
            >
              {children}
            </motion.div>
          </Combobox.Options>
        )}
      </AnimatePresence>
    </Portal>
  )
})
ComboBoxList.displayName = "ComboBoxList"
