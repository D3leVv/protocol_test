"use client"
import { MutableRefObject, useEffect } from "react"

// Define the hook's signature
export const useClickOutside = (ref: MutableRefObject<HTMLElement | null>, callback: () => void): void => {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | KeyboardEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleClickOutside)
    }
  }, [ref, callback])
}
