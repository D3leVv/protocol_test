import classNames from "classnames"
import { ReactNode } from "react"

export const SigningUpContainer = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div
    className={classNames(
      "flex h-full min-h-full w-full flex-col bg-background p-4 text-foreground lg:inline-flex lg:flex-row lg:gap-20 lg:p-6",
      className
    )}
  >
    {children}
  </div>
)
