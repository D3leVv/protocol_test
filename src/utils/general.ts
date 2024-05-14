import { Children, ReactNode, cloneElement, isValidElement } from "react"

export const findValueByKey = (obj: { [key: string]: any }, key: string): any => {
  if (key in obj) {
    return obj[key]
  }

  for (const prop in obj) {
    if (typeof obj[prop] === "object" && obj[prop] !== null) {
      const result = findValueByKey(obj[prop], key)
      if (result !== null) {
        return result
      }
    }
  }

  return null
}

export const addPropsToChildren = <P extends Partial<unknown>>({
  children,
  props,
}: {
  children: ReactNode
  props: P
}): ReactNode =>
  Children.map(children, (child) =>
    isValidElement(child)
      ? cloneElement(child, {
          ...child.props,
          ...props,
        })
      : child
  )

export const clamp = (value: number | undefined = 0, min: number, max: number) => Math.min(Math.max(value, min), max)

export class URLQueryParams {
  private url: URL

  constructor(url: string) {
    this.url = new URL(url)
  }

  // Adds a query parameter
  addParam(key: string, value: string): void {
    this.url.searchParams.append(key, value)
  }

  // Removes a query parameter
  removeParam(key: string): void {
    this.url.searchParams.delete(key)
  }

  // Updates a query parameter
  updateParam(key: string, value: string): void {
    this.url.searchParams.set(key, value)
  }

  // Gets the updated URL as a string
  toString(): string {
    return this.url.toString()
  }
}

export const classNames = (...classes: any) => classes.filter(Boolean).join(" ")
