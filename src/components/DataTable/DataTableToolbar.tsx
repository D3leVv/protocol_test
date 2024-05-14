"use client"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { Table } from "@tanstack/react-table"
import { Button } from "lib/Button/Button"
import { InputField } from "lib/InputField/InputField"
import { DataTableTableViewOptions } from "./DataTableViewOptions"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const isFiltered = table?.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <InputField
          placeholder="Filter tasks..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("title")?.setFilterValue(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {/*{table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )}*/}
        {isFiltered && (
          <Button
            variant="text"
            impact="none"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
            suffixIcon={<XMarkIcon className="h-4 w-4" />}
          >
            Reset
          </Button>
        )}
      </div>
      <DataTableTableViewOptions table={table} />
    </div>
  )
}
