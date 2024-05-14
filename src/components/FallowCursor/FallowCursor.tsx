"use client"
import { useMouseCoords } from "hooks/useMouseCoords"
import { ReactNode, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"

export default function FallowCursor({ children, open }: { children: ReactNode; open: boolean }) {
  const { x, y } = useMouseCoords()
  const divRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLElement | null>(null)
  const [offsetX, setOffsetX] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      if (divRef.current) {
        const rightEdge = x + divRef.current.clientWidth
        const windowWidth = window.innerWidth
        if (rightEdge > windowWidth) {
          setOffsetX(-divRef.current.clientWidth)
        } else {
          setOffsetX(0)
        }
      }
    }
    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [x, y])
  return (
    modalRef.current &&
    createPortal(
      open && (
        <div
          ref={divRef}
          style={{
            position: "fixed",
            top: `${y}px`,
            left: `${x + (offsetX !== 0 ? offsetX + 50 : 70)}px`,
            transform: "translate(-50%, -50%)",
            zIndex: 9999,
          }}
        >
          {children}
        </div>
      ),
      modalRef.current
    )
  )
}
