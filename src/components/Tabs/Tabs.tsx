import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react"
import classNames from "classnames"
import React, { PropsWithChildren } from "react"

interface TabItem {
  label: React.ReactNode
  disabled?: boolean
  content: React.ReactNode
}

export type TabsProps = PropsWithChildren<{
  items: TabItem[]
  variant?: "variant1" | "variant2"
  className?: string
}>

export const Tabs = ({ items, variant = "variant1", className }: TabsProps) => {
  const variants =
    variant === "variant1"
      ? classNames(
          " rounded-lg text-body2/medium py-2 px-4 leading-5  text-secondary-500 focus:outline-none ui-selected:text-foreground hover:bg-primary-50 ui-selected:bg-primary-50 disabled:text-secondary-300 disabled:cursor-not-allowed disabled:hover:bg-background flex items-center justify-center gap-3"
        )
      : classNames(
          "ui-selected:border-primary-500 ui-selected:text-foreground",
          "border-transparent text-secondary-500 hover:border-primary-500 hover:text-primary-500 hover:border-transparent",
          "items-center border-b-2 px-4 py-2 text-body2/medium  disabled:text-gray-300 disabled:cursor-not-allowed disabled:hover:border-transparent ring-0 outline-none flex items-center justify-center gap-3"
        )

  const tabsWrapper =
    variant === "variant1"
      ? classNames("inline-flex p-1 space-x-1 bg-background border border-secondary-100 rounded-xl")
      : classNames("border-b border-secondary-200  flex")

  return (
    <div className="px-2 sm:px-0">
      <TabGroup>
        <TabList className={tabsWrapper}>
          {items.map((tab, i) => (
            <Tab disabled={tab.disabled} key={i} className={variants}>
              {tab.label}
            </Tab>
          ))}
        </TabList>
        <TabPanels className="mt-6 ">
          {items.map((tab, idx) => (
            <TabPanel
              key={idx}
              className={classNames("rounded-xl bg-background p-3", "focus:outline-none  ", className)}
            >
              {tab.content}
            </TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
    </div>
  )
}
