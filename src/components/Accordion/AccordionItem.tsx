import { ReactNode, useContext } from "react"
import { AccordionContext } from "./context"

interface Props {
  children: ReactNode | ReactNode[] | (({ openIndexes }: { openIndexes: number[] }) => ReactNode | ReactNode[])
  className?: string | (({ openIndexes }: { openIndexes: number[] }) => string)
}

export const AccordionItem = ({ children, className }: Props) => {
  const { openIndexes } = useContext(AccordionContext)

  return (
    <div className={typeof className === "function" ? className({ openIndexes }) : className}>
      {typeof children === "function" ? children({ openIndexes }) : children}
    </div>
  )
}
