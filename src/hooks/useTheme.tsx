"use client"
import { useLayoutEffect, useState } from "react"
import { colorThemes } from "themes/theme"
type Theme = keyof typeof colorThemes
export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(localStorage.getItem("theme") as Theme)
  const changeTheme = () => {
    if (theme === "dark") {
      localStorage.setItem("theme", "light")
      setTheme("light")
    } else {
      localStorage.setItem("theme", "dark")
      setTheme("dark")
    }
  }

  useLayoutEffect(() => {
    if (!theme) {
      localStorage.setItem("theme", "dark")
      setTheme("dark")
    }
  }, [])
  return { theme, changeTheme }
}
