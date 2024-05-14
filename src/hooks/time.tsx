"use client"
export const useDateFormatMonth = () => {
  const formatter = new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
  })

  return { dateFormatMonth: (date: Date) => formatter.format(date) }
}
