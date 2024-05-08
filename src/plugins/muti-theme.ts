import hexRgb from "hex-rgb"
import plugin from "tailwindcss/plugin"

// ------------------------------
// Helpers

type Theme = Record<string, any>

const getNestedValue = (obj: Theme, path: string[]): any => {
  return path.reduce((prev, curr) => prev && prev[curr], obj)
}

const checkStructure = (base: Theme, path: string[] = [], themes: Record<string, Theme>): boolean => {
  Object.entries(base).forEach(([key, value]) => {
    const newPath = [...path, key]
    if (typeof value !== "string") {
      checkStructure(value, newPath, themes)
    } else {
      Object.entries(themes).forEach(([themeKey], index) => {
        if (index === 0) return

        if (!getNestedValue(themes, [themeKey, ...newPath])) {
          throw new Error(`The theme "${themeKey}" is missing the property "${newPath.join(".")}"`)
        }
      })
    }
  })
  return true
}

const getRgbChannels = (hex: string) => {
  const { red, green, blue } = hexRgb(hex.toLowerCase())
  return `${red} ${green} ${blue}`
}

const getCssVariableDeclarations = (
  input: Record<string, any>,
  path: string[] = [],
  output: Record<string, string> = {}
) => {
  Object.entries(input).forEach(([key, value]) => {
    const newPath = [...path, key]
    if (typeof value !== "string") {
      getCssVariableDeclarations(value, newPath, output)
    } else {
      output[`--${newPath.join("-")}`] = getRgbChannels(value)
    }
  })
  return output
}

const getColorUtilitiesWithCssVariableReferences = (input: Record<string, any>, path: string[] = []) => {
  return Object.fromEntries(
    Object.entries(input).map(([key, value]): any => {
      const newPath = path.concat(key)
      if (typeof value !== "string") {
        return [key, getColorUtilitiesWithCssVariableReferences(value, newPath)]
      } else {
        return [key, `rgb(var(--${newPath.join("-")}) / <alpha-value>)`]
      }
    })
  )
}

// ------------------------------

const multyTheme = plugin.withOptions(
  ({ themes }: { themes: Record<string, any>; textTheme?: Record<string, any> }) =>
    ({ addBase }) => {
      if (!themes) throw new Error("The multyTheme plugin requires a themes object to be passed in to it")
      checkStructure(Object.values(themes)[0], [], themes)
      addBase({
        ":root": getCssVariableDeclarations(Object.values(themes)[0]),
      })
      Object.entries(themes).forEach(([key, value]) => {
        return addBase({
          [`[data-theme="${key}"]`]: getCssVariableDeclarations(value),
        })
      })
    },

  ({ themes, textTheme }: { themes: Record<string, any>; textTheme?: Record<string, any> }) => {
    if (!themes) throw new Error("The multyTheme plugin requires a themes object to be passed in to it")
    checkStructure(Object.values(themes)[0], [], themes)
    return {
      theme: {
        colors: {
          ...getColorUtilitiesWithCssVariableReferences(Object.values(themes)[0]),
          transparent: "transparent",
        },
        fontSize: textTheme,
      },
    }
  }
)

export default multyTheme
