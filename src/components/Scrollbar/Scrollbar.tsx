"use client"
import cn from "classnames"
import { motion, useMotionValue } from "framer-motion"
import React, { PropsWithChildren, useLayoutEffect, useRef, useState } from "react"

interface ScrollbarProps extends PropsWithChildren<any> {
  style?: React.CSSProperties
  className?: string
  scrollBarClassName?: string
  scrollbarWidth?: number
  scrollbarHeight?: number
  thumbWidth?: number
  thumbHeight?: number
}

enum ScrollState {
  Start = "start",
  Middle = "middle",
  End = "end",
  Hidden = "hidden",
}

export const Scrollbar = ({
  scrollbarHeight = 6,
  scrollbarWidth = 237,
  thumbHeight = 6,
  thumbWidth = 115,
  scrollBarClassName,
  style,
  className,
  children,
}: ScrollbarProps) => {
  const gap = scrollbarWidth - thumbWidth
  const scrollbarRef = useRef<HTMLDivElement | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)
  const moveX = useMotionValue(0)
  const moveY = useMotionValue(0)
  const [scrollState, setScrollState] = useState(ScrollState.Hidden)

  useLayoutEffect(() => {
    const content = contentRef.current
    if (content) {
      const updateScrollbar = () => {
        const contentWidth = content.scrollWidth
        const viewportWidth = content.clientWidth
        const scrollLeft = content.scrollLeft

        // Clamp scroll within container
        const scrollPercentage = scrollLeft / (contentWidth - viewportWidth)
        moveX.set(scrollPercentage * gap)

        const scrollbarVisible = content.scrollWidth > content.clientWidth
        setScrollState(
          !scrollbarVisible
            ? ScrollState.Hidden
            : scrollPercentage === 0
              ? ScrollState.Start
              : scrollPercentage === 1
                ? ScrollState.End
                : ScrollState.Middle
        )
      }

      content.addEventListener("scroll", updateScrollbar)
      window.addEventListener("resize", updateScrollbar)
      updateScrollbar()

      const subscribeX = moveX.onChange((scrollPixels) => {
        const content = contentRef.current
        if (content) {
          const contentWidth = content.scrollWidth
          const viewportWidth = content.clientWidth
          const scrollPercentage = scrollPixels / gap
          content.scrollLeft = scrollPercentage * (contentWidth - viewportWidth)
        }
      })

      return () => {
        subscribeX()
        content.removeEventListener("scroll", updateScrollbar)
        window.removeEventListener("resize", updateScrollbar)
      }
    }
  })

  return (
    <div style={style} className={cn("overflow-auto", className)} ref={contentRef} data-scrollbar={scrollState}>
      {children}
      <div className="sticky bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2 transform parent-data-[scrollbar=hidden]:hidden">
        <motion.div
          ref={scrollbarRef}
          style={{
            width: scrollbarWidth,
            height: scrollbarHeight,
          }}
          className={cn("relative rounded-[90px] bg-secondary-300", scrollBarClassName)}
        >
          <motion.div
            style={{
              width: thumbWidth,
              height: thumbHeight,
              x: moveX,
              y: moveY,
            }}
            className="absolute inset-0 rounded-[90px] bg-primary-500 "
            drag={"x"}
            dragConstraints={{ left: 0, right: 122 }} // 122 = 237 - 115
            dragElastic={false}
            dragMomentum={false}
          />
        </motion.div>
      </div>
    </div>
  )
}
