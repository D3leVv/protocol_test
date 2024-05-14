import Link, { LinkProps } from 'next/link'
import { forwardRef } from 'react'
export type CustomLinkProps = LinkProps & {
  children: React.ReactNode
  id?: string
}

export const CustomLink = forwardRef<HTMLAnchorElement, CustomLinkProps>(
  ({ children, href, ...rest }, ref) => (
    <Link href={href} {...rest} ref={ref}>
      {children}
    </Link>
  ),
)
CustomLink.displayName = 'CustomLink'
