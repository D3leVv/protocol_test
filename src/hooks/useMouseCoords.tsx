"use client"
import { useEffect, useState } from "react"

type MouseCoords = {
  x: number
  y: number
}

export const useMouseCoords = () => {
  const [mouseCoords, setMouseCoords] = useState<MouseCoords>({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseEvent = (e: MouseEvent) => {
      setMouseCoords({ x: Math.abs(e.clientX), y: Math.abs(e.clientY) })
    }
    window.addEventListener("mousemove", handleMouseEvent)

    return () => {
      window.removeEventListener("mousemove", handleMouseEvent)
    }
  }, [])

  return mouseCoords
}
