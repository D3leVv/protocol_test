"use client"
import { ReactNode, Ref, forwardRef } from "react"

export type KanbanItemProps = {
  children: ReactNode
}
export const KanbanItem = forwardRef((props: KanbanItemProps, ref: Ref<HTMLDivElement>) => {
  return <div ref={ref}> {props.children}</div>
})

KanbanItem.displayName = "KanbanItem"
