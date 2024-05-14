'use client'

import { Row } from '@tanstack/react-table'

import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'
import { Menu } from 'components/Menu/Menu'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  console.log(row)
  return (
    <Menu>
      <Menu.Button>
        <AdjustmentsHorizontalIcon className="h-4 w-4" />
        <span className="sr-only">Open menu</span>
      </Menu.Button>
      <Menu.Content align="end" className="w-[160px]">
        <Menu.Item>Edit</Menu.Item>
        <Menu.Item>Make a copy</Menu.Item>
        <Menu.Item>Favorite</Menu.Item>
        <Menu.Separator />
        <Menu.Sub>
          <Menu.SubTrigger>Labels</Menu.SubTrigger>
        </Menu.Sub>
        <Menu.Separator />
        <Menu.Item>
          Delete
          <Menu.Shortcut>⌘⌫</Menu.Shortcut>
        </Menu.Item>
      </Menu.Content>
    </Menu>
  )
}
