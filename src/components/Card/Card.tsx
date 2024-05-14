import { ReactNode } from "react"
import { Paper } from "../Paper/Paper"

export type CardProps = {
  className?: string
  titlePrefix: ReactNode
  title?: string | ReactNode
  description?: string | ReactNode
  children?: ReactNode
  id?: string
}

export const Card = ({ children, className, titlePrefix, title, description, id }: CardProps) => {
  return (
    <Paper id={id} className={`${className}`}>
      {titlePrefix && titlePrefix}
      {title && <h3 className="text-center text-h2 text-foreground">{title}</h3>}
      {description && <p className="text-center text-body2/medium text-secondary-500">{description}</p>}
      {children}
    </Paper>
  )
}
