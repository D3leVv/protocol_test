"use client"
import { Tooltip } from "components/Tooltip/Tooltip"
import { motion, Variants } from "framer-motion"

export interface ProgressbarProps {
  tooltipText?: string
  tooltipPosition?: "top" | "bottom" | "left" | "right"
  progress: number
  bgColor?: string
  barColor?: string
  height?: number
  motionKey?: string
}

export const Progressbar = ({
  tooltipPosition,
  tooltipText,
  progress,
  bgColor = "bg-secondary-200",
  barColor = "bg-primary-500",
  height = 4,
  motionKey,
}: ProgressbarProps) => {
  const barWidth = Math.min(Math.max(progress, 0), 100)

  const progressVariant: Variants = {
    initial: {
      width: `${barWidth}%`,
      transition: {
        duration: 0.5,
      },
    },
    animate: {
      width: `${barWidth}%`,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <>
      <div
        data-tooltip-id="Progressbar"
        data-tooltip-content={tooltipText}
        data-testid="Progressbar"
        data-tooltip-place={tooltipPosition}
        className="w-full"
      >
        <div className={`relative ${bgColor} w-full overflow-hidden rounded`} style={{ height: `${height}px` }}>
          <motion.div
            key={motionKey}
            className={`absolute left-0 top-0 ${barColor} h-full rounded-full`}
            initial="initial"
            animate="animate"
            variants={progressVariant}
          />
        </div>
      </div>
      <Tooltip contentId="Progressbar" title={tooltipText} />
    </>
  )
}
