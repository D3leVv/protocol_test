import { AnimatePresence, Variants, motion, useAnimationControls } from "framer-motion"
import { useTheme } from "hooks/useTheme"
import { navigation } from "lib/Sidebar/Sidebar.mock"
import { useEffect, useState } from "react"
import { classNames } from "utils/styles"
import { SidebarLink } from "./SidebarLink"
import { SidebarNavigation } from "./SidebarNavigation"

const containerVariants: Variants = {
  close: {
    width: "5rem",
    transition: {
      type: "linear",
      duration: 0.2,
    },
  },
  open: {
    width: "16rem",
    transition: {
      type: "linear",
      duration: 0.2,
    },
  },
}

const svgVariants = {
  close: {
    rotate: 360,
  },
  open: {
    rotate: 180,
  },
}

export const Sidebar = () => {
  const { theme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<string | null>(null)

  const containerControls = useAnimationControls()
  const svgControls = useAnimationControls()

  useEffect(() => {
    if (isOpen) {
      containerControls.start("open")
      svgControls.start("open")
    } else {
      containerControls.start("close")
      svgControls.start("close")
    }
  }, [isOpen])

  const handleOpenClose = () => {
    setIsOpen(!isOpen)
    setSelectedProject(null)
  }

  return (
    <>
      <motion.nav
        variants={containerVariants}
        animate={containerControls}
        initial="close"
        data-testId="sidebar"
        className={classNames(
          "flex flex-col z-50 gap-20 p-5 absolute top-0 left-0 h-full shadow shadow-foreground text-foreground overflow-hidden",
          theme === "dark" ? "bg-gray-900" : "bg-background"
        )}
      >
        <div className="flex relative flex-row w-full justify-between place-items-center ">
          <div className="flex flex-col gap-3 w-full">
            <a data-testId="logo" href="/" className="flex gap-2">
              <img
                className="w-8 min-w-8"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company"
              />
              <h2 className="text-h2 overflow-clip whitespace-nowrap tracking-wide">Loremlogo</h2>
            </a>
          </div>
          <button
            data-testId={"open-close-button"}
            aria-label={isOpen ? "Close Sidebar" : "Open Sidebar"}
            className="absolute p-0 -right-6 bg-foreground/20 rounded-l-sm"
            onClick={() => handleOpenClose()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
                variants={svgVariants}
                animate={svgControls}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                }}
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {navigation.map((item) => (
            <SidebarLink key={item.href} href={item.href} current={item.current} name={item.name}>
              <item.icon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
            </SidebarLink>
          ))}
        </div>
      </motion.nav>
      <AnimatePresence>
        {selectedProject && (
          <SidebarNavigation
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
            isOpen={isOpen}
          />
        )}
      </AnimatePresence>
    </>
  )
}
