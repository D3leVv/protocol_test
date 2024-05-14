import { createContext } from "react"

interface Context {
  openIndexes: number[]
  toggleIndex: (index: number) => void
}

export const AccordionContext = createContext<Context>({
  openIndexes: [],
  toggleIndex: () => {},
})
