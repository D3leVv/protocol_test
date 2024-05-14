import classNames from "classnames"

interface Props {
  children: React.ReactNode
  name: string
  href: string
  current: boolean
}

export const SidebarLink = ({ children, name, current, href }: Props) => {
  return (
    <a
      data-testid={name}
      href={href}
      className={classNames(
        "flex p-1 rounded cursor-pointer stroke-[2] hover:stroke-secondary-100 stroke-secondary-400 text-foreground hover:text-foreground place-items-center gap-3 hover:bg-primary-500 transition-colors duration-100",
        current ? "bg-primary-500 text-white" : ""
      )}
    >
      {children}
      <p className="overflow-clip whitespace-nowrap tracking-wide">{name}</p>
    </a>
  )
}
