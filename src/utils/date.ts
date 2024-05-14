import * as d from "date-fns"

export const dateFormatStandard = (date: Date | number) => {
  return d.format(date, "MM/dd/yyyy")
}

export const dateFormatMonth = (date: Date | number) => {
  return d.format(date, "MMM yyyy")
}

export const isDate = (date: any): date is Date => {
  return date instanceof Date && !isNaN(date.getTime())
}

export const parseFormatMonth = (date: string) => {
  return d.parse(date, "MMM yyyy", new Date())
}

export const parseFormatStandard = (date: string) => {
  return d.parse(date, "MM/dd/yyyy", new Date())
}

export const dateSeparators = ["/", "-", ".", " "]

export const checkAndParseDateString = (dateString: Date | string) => {
  if (isDate(dateString)) {
    return dateString
  }

  let day
  let month
  let year

  for (let i = 0; i < dateSeparators.length; i++) {
    const separator = dateSeparators[i]
    const parts = dateString.split(separator)
    if (parts.length === 3) {
      day = +parts[0]
      month = +parts[1]
      year = +parts[2]
      break
    }
  }
  if ((!day || !month || !year) && dateString.length === 10) {
    throw new Error("Invalid date format")
  }
  if (!day || !month || !year || +year < 1900 || +year > 2200 || +month < 1 || +month > 12 || +day < 1 || +day > 31) {
    return dateString
  }
  return new Date(+year, +month - 1, +day)
}
