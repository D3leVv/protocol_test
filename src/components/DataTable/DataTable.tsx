"use client"
import {
  ColumnDef,
  ColumnFiltersState,
  ColumnSizingState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import classNames from "classnames"
import { Table } from "components/Table/Table"
import { useMemo, useState } from "react"

const TABLE_MIN_WIDTH = 1130
const ACTIONS_WIDTH = 48
const PAD_COL_HEADER = 24

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export const DataTable = <T, V>({ columns, data }: DataTableProps<T, V>) => {
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({})

  const table = useReactTable({
    data: useMemo(() => data, [data]),
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      columnSizing,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    columnResizeMode: "onChange",
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onColumnSizingChange: (updater) => {
      const state = typeof updater === "function" ? updater(columnSizing) : updater
      for (const name in state) {
        state[name] = Math.max(Math.round(state[name]), 100)
      }
      setColumnSizing(state)
    },
  })
  const targetTableWidth = table.getCenterTotalSize() + ACTIONS_WIDTH
  const tableWidth = Math.max(targetTableWidth, TABLE_MIN_WIDTH)

  return (
    <Table style={{ width: tableWidth }}>
      <Table.Header>
        {table.getHeaderGroups().map((headerGroup) => (
          <Table.Row key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <Table.Head
                style={{
                  width: header.getSize(),
                }}
                colSpan={header.colSpan}
                key={header.id}
                className="relative"
              >
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                {header.column.getCanResize() && (
                  <div
                    onMouseDown={header.getResizeHandler()}
                    onTouchStart={header.getResizeHandler()}
                    className={classNames(
                      "absolute -right-[5px] top-0 z-20 h-full w-[11px] cursor-col-resize touch-none select-none bg-foreground bg-opacity-0 transition-colors hover:bg-opacity-20",
                      header.column.getIsResizing() && "!bg-opacity-20"
                    )}
                  >
                    <div
                      className={classNames(
                        "absolute left-[5px] top-0 h-full w-0 border-l transition group-hover:opacity-100",
                        header.column.getIsResizing() && header.column.getCanResize()
                          ? "border-secondary-100 opacity-100"
                          : "border-secondary-200 opacity-0"
                      )}
                    />
                  </div>
                )}
              </Table.Head>
            ))}
          </Table.Row>
        ))}
      </Table.Header>
      <Table.Body>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <Table.Row key={row.id} data-state={row.getIsSelected() && "selected"} className="group relative">
              {row.getVisibleCells().map((cell) => (
                <Table.Cell
                  key={cell.id}
                  style={{
                    width: cell.column.getSize(),
                    maxWidth: cell.column.getSize() - PAD_COL_HEADER,
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Table.Cell>
              ))}
            </Table.Row>
          ))
        ) : (
          <Table.Row>
            <Table.Cell colSpan={columns.length} className="h-24 text-center">
              No results.
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  )
}
