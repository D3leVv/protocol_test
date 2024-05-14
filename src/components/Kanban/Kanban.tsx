import { Scrollbar } from "lib/Scrollbar/Scrollbar"
import { Children, ReactNode } from "react"
import { KanbanColumn } from "./components/KanbanColumn"
import { KanbanItem } from "./components/KanbanItem"
import { KanbanItems } from "./components/KanbanItems"

const MAX_COL_SIZE = 280

type KanbanProps = {
  children: ReactNode
}

export const Kanban = ({ children }: KanbanProps) => {
  const columns = Children.count(children)
  return (
    <Scrollbar
      scrollAxis="x"
      className="scrollbar-hide relative flex h-[calc(100vh-190px)] w-full flex-col items-start gap-y-4 lg:h-[calc(100vh-220px)] lg:max-w-[1000px]"
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, minmax(${MAX_COL_SIZE}px, 1fr))`,
        }}
        className={`h-full gap-6`}
      >
        {children}
        <div className="pt-10" />
      </div>
    </Scrollbar>
  )
}

Kanban.Column = KanbanColumn
Kanban.Item = KanbanItem
Kanban.Items = KanbanItems
