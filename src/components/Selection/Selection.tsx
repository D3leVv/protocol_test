"use client"
import FallowCursor from "components/FallowCursor/FallowCursor"
import { useAreaSelection } from "components/Selection/useAreaSelection"
import { createContext, forwardRef, useRef } from "react"

const SelectionContext = createContext<DOMRect | null>(null)

const Container = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      ref={ref}
      style={{ cursor: "crosshair", zIndex: 9998 }}
      className="min-w-screen fixed inset-0 h-full min-h-screen w-full text-foreground"
    />
  )
})

type Props = {
  onMouseEnd: (rect: DOMRect) => void
  onCancel: () => void
  tooltipText?: string
}

export default function Selection({ onMouseEnd, onCancel, tooltipText }: Props) {
  const selectContainerRef = useRef<HTMLDivElement | null>(null)
  const selection = useAreaSelection({
    onMouseEnd,
    onCancel,
    container: selectContainerRef,
  })
  return (
    <SelectionContext.Provider value={selection}>
      <Container ref={selectContainerRef} />
      {tooltipText && (
        <FallowCursor open={true}>
          <p className="h-full w-full whitespace-nowrap rounded-full bg-primary-500/50 p-2 text-foreground">
            {tooltipText}
          </p>
        </FallowCursor>
      )}
    </SelectionContext.Provider>
  )
}
