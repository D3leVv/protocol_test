import { RefObject, useEffect, useRef, useState } from "react"

interface Coordinates {
  x: number
  y: number
}
interface DrawnArea {
  start: undefined | Coordinates
  end: undefined | Coordinates
}
interface UseAreaSelectionProps {
  onMouseEnd: (rect: DOMRect) => void
  onCancel: () => void
  container: React.RefObject<HTMLElement> | undefined
}
const boxNode = document.createElement("div")
boxNode.className = "fixed rounded-sm !bg-primary-500/50 !border-primary-500/50 border-2 z-[9999] pointer-events-none"

export function useAreaSelection({
  container = { current: document.body },
  onCancel,
  onMouseEnd,
}: UseAreaSelectionProps) {
  const boxRef = useRef<HTMLDivElement>(boxNode)
  const boxElement = boxRef
  const [mouseDown, setMouseDown] = useState<boolean>(false)
  const [selection, setSelection] = useState<DOMRect | null>(null)
  const [drawArea, setDrawArea] = useState<DrawnArea>({
    start: undefined,
    end: undefined,
  })
  const [shouldSave, setShouldSave] = useState<boolean>(true)

  const handleMouseMove = (e: MouseEvent) => {
    document.body.style.userSelect = "none"
    setDrawArea((prev) => ({
      ...prev,
      end: {
        x: e.clientX,
        y: e.clientY,
      },
    }))
  }

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      const containerElement = container.current
      setMouseDown(true)
      setShouldSave(true)
      if (containerElement && containerElement.contains(e.target as Node)) {
        document.addEventListener("mousemove", handleMouseMove)
        setDrawArea({
          start: {
            x: e.clientX,
            y: e.clientY,
          },
          end: {
            x: e.clientX,
            y: e.clientY,
          },
        })
      }
    }

    const handleMouseUp = () => {
      document.body.style.userSelect = "initial"
      document.removeEventListener("mousemove", handleMouseMove)
      setMouseDown(false)
    }
    const containerElement = container.current
    if (containerElement) {
      containerElement.addEventListener("mousedown", handleMouseDown)
      document.addEventListener("mouseup", handleMouseUp)

      return () => {
        containerElement.removeEventListener("mousedown", handleMouseDown)
        document.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [container])

  useEffect(() => {
    const { start, end } = drawArea
    if (start && end && boxElement.current) {
      drawSelectionBox(boxElement.current, start, end)
      setSelection(boxElement.current.getBoundingClientRect())
    }
  }, [drawArea, boxElement])

  useEffect(() => {
    const containerElement = container.current
    const selectionBoxElement = boxElement.current
    if (containerElement && selectionBoxElement) {
      if (mouseDown) {
        if (!containerElement.contains(selectionBoxElement)) {
          selectionBoxElement.style.zIndex = "9999"
          selectionBoxElement.style.cursor = "pointer"
          containerElement.appendChild(selectionBoxElement)
        }
      } else {
        if (containerElement.contains(selectionBoxElement)) {
          containerElement.style.cursor = "initial"
          containerElement.removeChild(selectionBoxElement)
          const timeout = setTimeout(() => {
            if (selection && shouldSave) {
              onMouseEnd(selection)
            }
          }, 50)
          return () => {
            clearTimeout(timeout)
          }
        }
      }
    }
  }, [onMouseEnd, selection, shouldSave, mouseDown, container, boxElement])

  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCancel?.()
        setShouldSave(false)
        setMouseDown(false)
        setDrawArea({
          start: undefined,
          end: undefined,
        })
        setSelection(null)
      }
    }
    document.addEventListener("keydown", handleEscapeKey)
    return () => {
      document.removeEventListener("keydown", handleEscapeKey)
    }
  }, [onCancel])

  return selection
}

export function useSelected(elementRef: RefObject<HTMLElement>, selection: DOMRect | null) {
  const [isSelected, setIsSelected] = useState(false)

  useEffect(() => {
    if (!elementRef.current || !selection) {
      setIsSelected(false)
    } else {
      console.log(".")
      const a = elementRef.current.getBoundingClientRect()
      const b = selection
      setIsSelected(!(a.y + a.height < b.y || a.y > b.y + b.height || a.x + a.width < b.x || a.x > b.x + b.width))
    }
  }, [elementRef, selection])

  return isSelected
}

function drawSelectionBox(boxElement: HTMLElement, start: Coordinates, end: Coordinates): void {
  const b = boxElement
  if (end.x > start.x) {
    b.style.left = start.x + "px"
    b.style.width = end.x - start.x + "px"
  } else {
    b.style.left = end.x + "px"
    b.style.width = start.x - end.x + "px"
  }

  if (end.y > start.y) {
    b.style.top = start.y + "px"
    b.style.height = end.y - start.y + "px"
  } else {
    b.style.top = end.y + "px"
    b.style.height = start.y - end.y + "px"
  }
}
