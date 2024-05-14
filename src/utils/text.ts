// Function to capitalize the first letter of a string
const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.toLowerCase().slice(1)
}

export const splitByCamelCase = (str: string) => {
  const splitStr = str.replace(/([a-z]+)([A-Z])/g, "$1 $2")
  return capitalizeFirstLetter(splitStr)
}

export const initialsFromName = (username: string | undefined | null, count = 2) =>
  typeof username === "string"
    ? username
        .split(/\s+/)
        .splice(0, count)
        .map((word) => word.charAt(0))
        .join("")
        .toUpperCase()
    : ""
