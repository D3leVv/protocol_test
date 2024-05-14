import { UseCustomPopperReturnType } from "hooks/popper"
import { ReactNode, createContext, useContext } from "react"

export type MenuContextType = {
  open: boolean
} & UseCustomPopperReturnType

export const MenuContext = createContext({} as MenuContextType)

export const useMenuContext = () => {
  const ctx = useContext(MenuContext)
  if (!ctx) {
    throw new Error("useMenuContext must be used within MenuProvider")
  }
  return ctx
}

export const MenuProvider = ({
  children,
  ...rest
}: {
  children: ReactNode
  open: boolean
} & UseCustomPopperReturnType) => {
  return <MenuContext.Provider value={rest}>{children}</MenuContext.Provider>
}
