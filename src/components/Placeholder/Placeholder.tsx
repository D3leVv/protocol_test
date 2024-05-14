import { ReactNode } from "react"

interface Props {
  children: ReactNode
}

export const Placeholder = ({ children }: Props) => <p className="text-link1/regular text-gray-400">{children}</p>
