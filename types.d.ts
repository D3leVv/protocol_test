import { type SearchOptions } from "flexsearch"

declare module "mdx/search.mjs" {
  export type Result = {
    url: string
    title: string
    pageTitle?: string
  }

  export function search(query: string, options?: SearchOptions): Array<Result>
}
type NoInfer<T> = [T][T extends any ? 0 : never]
