import { forwardRef } from "react"
import { Link, LinkProps } from "react-router-dom"
export type CustomLinkProps = {
  href: string
  children: React.ReactNode
  className?: string
} & Omit<LinkProps, "to">

export const CustomLink = forwardRef<HTMLAnchorElement, CustomLinkProps>(({ children, href, ...rest }, ref) => (
  <Link to={href} {...rest} ref={ref}>
    {children}
  </Link>
))
CustomLink.displayName = "CustomLink"
