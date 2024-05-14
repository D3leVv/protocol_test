"use client"
import * as MenuPrimitive from '@radix-ui/react-dropdown-menu'
import * as React from 'react'

import { ChevronRightIcon, TvIcon } from '@heroicons/react/24/outline'
import cn from 'classnames'
import { Button, ButtonProps } from 'components/Button/Button'
import { Checkbox } from 'components/Checkbox/Checkbox'

const Menu = (props: MenuPrimitive.DropdownMenuProps) => (
  <MenuPrimitive.Root {...props}>{props.children}</MenuPrimitive.Root>
)

Menu.Group = MenuPrimitive.Group

Menu.Sub = MenuPrimitive.Sub

Menu.RadioGroup = MenuPrimitive.RadioGroup

Menu.SubTrigger = React.forwardRef<
  React.ElementRef<typeof MenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <MenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-foreground/10 focus:bg-foreground/10 data-[state=open]:bg-foreground/10',
      inset && 'pl-8',
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRightIcon className="ml-auto h-4 w-4" />
  </MenuPrimitive.SubTrigger>
))
Menu.SubTrigger.displayName = MenuPrimitive.SubTrigger.displayName

Menu.SubContent = React.forwardRef<
  React.ElementRef<typeof MenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.SubContent> & {
    portalProps?: React.ComponentPropsWithoutRef<typeof MenuPrimitive.Content>
  }
>(({ className, ...props }, ref) => {
  const { portalProps, ...contentProps } = props
  return (
    <MenuPrimitive.Portal {...portalProps}>
      <MenuPrimitive.SubContent
        ref={ref}
        className={cn(
          'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] overflow-hidden rounded-md border border-secondary-100 bg-background p-1 text-foreground shadow-lg',
          className,
        )}
        {...contentProps}
      />
    </MenuPrimitive.Portal>
  )
})
Menu.SubContent.displayName = MenuPrimitive.SubContent.displayName

Menu.Content = React.forwardRef<
  React.ElementRef<typeof MenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <MenuPrimitive.Portal>
    <MenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'z-50 min-w-[8rem] overflow-hidden rounded-md border border-secondary-100 bg-background p-1 text-foreground shadow-md',
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className,
      )}
      {...props}
    />
  </MenuPrimitive.Portal>
))
Menu.Content.displayName = MenuPrimitive.Content.displayName

Menu.Item = React.forwardRef<
  React.ElementRef<typeof MenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <MenuPrimitive.Item
    ref={ref}
    className={cn(
      'text-body2/regular relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 outline-none transition-colors focus:bg-foreground/10 focus:text-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      inset && 'pl-8',
      className,
    )}
    {...props}
  />
))
Menu.Item.displayName = MenuPrimitive.Item.displayName

Menu.CheckboxItem = React.forwardRef<
  React.ElementRef<typeof Checkbox>,
  React.ComponentPropsWithoutRef<typeof Checkbox>
>(({ className, children, checked, ...props }, ref) => (
  <Checkbox
    ref={ref}
    wrapperClassName={cn(
      className,
      'px-3 py-1.5 w-full h-full focus:bg-foreground/10 hover:bg-foreground/10 rounded-md',
    )}
    checked={checked}
    {...props}
  />
))
Menu.CheckboxItem.displayName = MenuPrimitive.CheckboxItem.displayName

Menu.RadioItem = React.forwardRef<
  React.ElementRef<typeof MenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <MenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-foreground/10 focus:text-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenuPrimitive.ItemIndicator>
        <TvIcon className="fill-current h-4 w-4" />
      </MenuPrimitive.ItemIndicator>
    </span>
    {children}
  </MenuPrimitive.RadioItem>
))
Menu.RadioItem.displayName = MenuPrimitive.RadioItem.displayName

Menu.Label = React.forwardRef<
  React.ElementRef<typeof MenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <MenuPrimitive.Label
    ref={ref}
    className={cn(
      'text-body3/regular px-2 py-1.5 font-semibold',
      inset && 'pl-8',
      className,
    )}
    {...props}
  />
))
Menu.Label.displayName = MenuPrimitive.Label.displayName

Menu.Separator = React.forwardRef<
  React.ElementRef<typeof MenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <MenuPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-secondary-50', className)}
    {...props}
  />
))
Menu.Separator.displayName = MenuPrimitive.Separator.displayName

Menu.Shortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn('ml-auto text-xs tracking-widest opacity-60', className)}
      {...props}
    />
  )
}

Menu.Button = (props: Omit<ButtonProps<'button'>, 'onClick'>) => (
  <MenuPrimitive.Trigger asChild>
    <Button {...props} />
  </MenuPrimitive.Trigger>
)

export { Menu }
