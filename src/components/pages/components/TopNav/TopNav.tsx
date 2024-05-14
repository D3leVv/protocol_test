import { MagnifyingGlassIcon } from "@heroicons/react/20/solid"

export const TopNav = () => (
  <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b border-foreground/5 bg-background px-4 shadow-sm sm:px-6 lg:px-8">
    <div />

    <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
      <form className="flex flex-1" action="#" method="GET">
        <label htmlFor="search-field" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <MagnifyingGlassIcon
            className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-foreground"
            aria-hidden="true"
          />
          <input
            id="search-field"
            className=" block h-full w-full border-0 bg-transparent py-0 pl-8 pr-0 text-foreground focus:ring-0"
            placeholder="Search..."
            type="search"
            name="search"
          />
        </div>
      </form>
    </div>
  </div>
)
