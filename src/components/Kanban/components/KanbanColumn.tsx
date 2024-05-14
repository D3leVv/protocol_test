import { Paper } from "lib/Paper/Paper"
import { Children, ReactNode, Ref, forwardRef } from "react"
import { getContrastColor } from "utils"

const KANBAN_COLUMN_WIDTH = 270

export type KanbanColumnProps = {
  bgColor: string
  columnTitle: string
  children: ReactNode
  footer?: ReactNode
}

export const KanbanColumn = forwardRef(
  ({ bgColor, children, footer, columnTitle }: KanbanColumnProps, ref: Ref<HTMLDivElement>) => {
    const count = Children.count(children)
    return (
      <div
        style={{
          backgroundColor: bgColor,
        }}
        className={`!flex-1 min-w-[${KANBAN_COLUMN_WIDTH}px] flex h-10 select-none flex-col gap-4 rounded-md`}
        ref={ref}
      >
        <div className="flex h-full items-center justify-between p-2">
          <p style={{ color: getContrastColor(bgColor) }} className={`mb-0 font-medium`}>
            {columnTitle}
          </p>
          <p className="flex h-6 w-6 items-center justify-center rounded-full bg-background pt-[3.5px] text-center">
            {count}
          </p>
        </div>
        {children}
        {footer && <Paper className="!p-4 text-center">{footer}</Paper>}
      </div>
    )
  }
)

KanbanColumn.displayName = "KanbanColumn"
