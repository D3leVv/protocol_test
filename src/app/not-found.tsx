import { Button } from "components/Button/Button"
import Link from "next/link"

export default function NotFound() {
  return (
    <>
      {/* <HeroPattern /> */}
      <div className="mx-auto flex h-full max-w-xl flex-col items-center justify-center py-16 text-center">
        <p className="text-sm font-semibold text-primary-900 dark:text-white">404</p>
        <h1 className="mt-2 text-2xl font-bold text-primary-900 dark:text-white">Page not found</h1>
        <p className="mt-2 text-base text-primary-600 dark:text-secondary-400">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <Button as={Link} href="/" className="mt-8">
          Back to docs
        </Button>
      </div>
    </>
  )
}
