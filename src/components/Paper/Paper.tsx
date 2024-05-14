import classNames from "classnames"
import { ReactNode } from "react"

export interface PaperProps {
  children: ReactNode
  className?: string
  id?: string
}

export const Paper = ({ children, className, id }: PaperProps) => {
  return (
    <div
      id={id}
      className={classNames(
        "flex flex-col items-center justify-center gap-4 rounded-2xl border border-secondary-100 bg-background p-4 lg:p-10",
        className
      )}
    >
      {children}
    </div>
  )
}
