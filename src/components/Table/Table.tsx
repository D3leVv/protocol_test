import * as React from 'react'

import cn from 'classnames'
import { Paper } from 'components/Paper/Paper'
import { Scrollbar } from 'components/Scrollbar/Scrollbar'

const trClass = `[&>*:nth-child(2)]:[&:has([role=checkbox])]:sticky
  [&>*:nth-child(2)]:[&:has([role=checkbox])]:z-10
  [&>*:nth-child(2)]:[&:has([role=checkbox])]:clip-show-right
  [&>*:nth-child(2)]:[&:has([role=checkbox])]:left-10
  [&>*:nth-child(2)]:[&:has([role=checkbox])]:parent-data-[scrollbar=middle]:bg-background
  [&>*:nth-child(2)]:[&:has([role=checkbox])]:parent-data-[scrollbar=end]:bg-background
  [&>*:nth-child(2)]:[&:has([role=checkbox])]:parent-data-[scrollbar=end]:bg-background
  [&>*:nth-child(2)]:[&:has([role=checkbox])]:parent-data-[scrollbar=middle]:bg-background`

const tdClass = `px-[18px] !text-body2/regular text-left group-hover:bg-foreground/10 py-4 text-foreground align-middle
  [&:has([role=checkbox])]:pl-3
  [&:has([role=checkbox])]:!px-1
  [&:has([role=checkbox])]:!w-[20px]
  first:sticky first:z-10
  first:max-w-none
  first:left-0 
  first:clip-show-right
  parent-data-[scrollbar=start]:first:drop-shadow-none
  parent-data-[scrollbar=hidden]:first:drop-shadow-none
  parent-data-[scrollbar=middle]:first:bg-background
  parent-data-[scrollbar=end]:first:bg-background
 `

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn('[&_tr]: border-b border-secondary-100', className)}
    {...props}
  />
))
TableHeader.displayName = 'Table.Header'

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn(className)} {...props} />
))
TableBody.displayName = 'TableBody'

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      'text-body2/medium bg-foreground/10 text-foreground',
      className,
    )}
    {...props}
  />
))
TableFooter.displayName = 'TableFooter'

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      'group cursor-pointer border-b border-secondary-100 transition-colors last:border-b-0 data-[state=selected]:bg-foreground/10',
      className,
      trClass,
    )}
    {...props}
  />
))
TableRow.displayName = 'TableRow'

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th ref={ref} className={cn(className, tdClass)} {...props} />
))
TableHead.displayName = 'TableHead'

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, id = 'td', children, ...props }, ref) => (
  <td id={id} ref={ref} className={cn(className, tdClass)} {...props}>
    {children}
  </td>
))
TableCell.displayName = 'TableCell'

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn('text-body2/regular mt-4 text-foreground', className)}
    {...props}
  />
))

TableCaption.displayName = 'TableCaption'

const Table = Object.assign(
  React.forwardRef<
    HTMLTableElement,
    React.HTMLAttributes<HTMLTableElement> & {
      children: React.ReactNode
      scrollBarClassName?: string
      paperClassName?: string
    }
  >(({ className, paperClassName, scrollBarClassName, ...props }, ref) => (
    <Paper className={cn('items-start lg:p-6', paperClassName)}>
      <Scrollbar
        scrollAxis="x"
        className={cn(
          'no-scrollbar scrollbar-hide flex h-full w-full flex-col items-start gap-y-6 overflow-auto',
          scrollBarClassName,
        )}
      >
        <table
          ref={ref}
          className={cn('table w-full min-w-full overflow-auto', className)}
          {...props}
        >
          {props.children}
        </table>
      </Scrollbar>
    </Paper>
  )),
  {
    Header: TableHeader,
    Body: TableBody,
    Footer: TableFooter,
    Row: TableRow,
    Head: TableHead,
    Cell: TableCell,
    Caption: TableCaption,
  },
)

export { Table }
