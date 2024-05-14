export function getContrastColor(hexColor: string) {
  const trimmedHex = hexColor.trim().replace("#", "")
  const sixDigitHex =
    trimmedHex.length === 3
      ? trimmedHex
          .split("")
          .map((char) => char + char)
          .join("")
      : trimmedHex

  const r = parseInt(sixDigitHex.slice(0, 2), 16)
  const g = parseInt(sixDigitHex.slice(2, 4), 16)
  const b = parseInt(sixDigitHex.slice(4, 6), 16)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  // Return white color for dark colors and black for light colors.
  return brightness < 128 ? "#ffffff" : "#000000"
}
