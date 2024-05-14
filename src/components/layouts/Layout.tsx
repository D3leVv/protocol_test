"use client"

import { Footer } from "components/Footer/Footer"
import { Header } from "components/Header/Header"
import { Logo } from "components/Logo/Logo"
import { Navigation } from "components/Navigation/Navigation"
import { Section, SectionProvider } from "components/SectionProvider/SectionProvider"
import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Layout({
  children,
  allSections,
}: {
  children: React.ReactNode
  allSections: Record<string, Array<Section>>
}) {
  let pathname = usePathname()

  return (
    <SectionProvider sections={allSections[pathname] ?? []}>
      <div className="h-full lg:ml-72 xl:ml-80">
        <motion.header layoutScroll className="contents lg:pointer-events-none lg:fixed lg:inset-0 lg:z-40 lg:flex">
          <div className="lg:border-zinc-900/10 contents lg:pointer-events-auto lg:block lg:w-72 lg:overflow-y-auto lg:border-r lg:px-6 lg:pb-8 lg:pt-4 xl:w-80 lg:dark:border-white/10">
            <div className="hidden lg:flex">
              <Link href="/" aria-label="Home">
                <Logo />
              </Link>
            </div>
            <Header />
            <Navigation className="hidden lg:mt-10 lg:block" />
          </div>
        </motion.header>
        <div className="relative flex h-full flex-col px-4 pt-14 sm:px-6 lg:px-8">
          <main className="flex-auto">{children}</main>
          <Footer />
        </div>
      </div>
    </SectionProvider>
  )
}
