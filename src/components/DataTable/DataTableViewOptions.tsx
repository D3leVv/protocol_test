import { TableCellsIcon } from "@heroicons/react/24/outline"
import { Table } from "@tanstack/react-table"
import { Menu } from "lib/Menu/Menu"

export const DataTableTableViewOptions = <TData,>({ table }: { table: Table<TData> }) => {
  return (
    <Menu>
      <Menu.Button variant="secondary" impact="light" size="sm">
        <TableCellsIcon className="h-5 w-5 text-primary-500" />
      </Menu.Button>
      <Menu.Content>
        <Menu.Label>Select columns</Menu.Label>
        {table
          .getAllColumns()
          .filter((column) => typeof column.accessorFn !== "undefined" && column.getCanHide())
          .map((column) => {
            return (
              <Menu.CheckboxItem
                key={column.id}
                onChange={column.getToggleVisibilityHandler()}
                checked={column.getIsVisible()}
                label={column.id}
              />
            )
          })}
      </Menu.Content>
    </Menu>
  )
}
