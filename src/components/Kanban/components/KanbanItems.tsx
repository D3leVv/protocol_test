"use client"
import { ReactNode, Ref, forwardRef } from "react"

type KanbanItemsProps = {
  children: ReactNode
}

export const KanbanItems = forwardRef(({ children }: KanbanItemsProps, ref: Ref<HTMLDivElement>) => {
  return (
    <div ref={ref} className="flex flex-col gap-4">
      {children}
    </div>
  )
})

KanbanItems.displayName = "KanbanItems"
