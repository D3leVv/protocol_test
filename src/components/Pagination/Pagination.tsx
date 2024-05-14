import classNames from "classnames"
import { AnimatePresence, Variants, motion } from "framer-motion"
import { wrap } from "popmotion"
import { ReactNode, useState } from "react"
import useMeasure from "react-use-measure"

const variants: Variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }
  },
}

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
const swipeConfidenceThreshold = 10000
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity
}

export const Pagination = <T,>({ options, children }: { options: T[]; children: (option: T) => ReactNode }) => {
  const [[page, direction], setPage] = useState([0, 0])
  const [ref, { height }] = useMeasure()

  const index = wrap(0, options.length, page)

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection])
  }

  return (
    <div style={{ maxHeight: height + 20 }} className="relative flex h-full w-full flex-col gap-4 overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          className="absolute z-50 w-full"
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(_, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x)
            if (swipe < -swipeConfidenceThreshold) {
              paginate(1)
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1)
            }
          }}
        >
          <div className="pointer-events-none" ref={ref}>
            {children(options[index])}
          </div>
        </motion.div>
      </AnimatePresence>
      <div
        className="absolute flex items-center gap-[2px]"
        style={{
          top: height + 10,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        {options.map((_, i) => (
          <Dot
            key={i}
            onClick={() => paginate(i - index)}
            className={classNames(i === index ? "text-primary-600" : "text-secondary-200")}
          />
        ))}
      </div>
    </div>
  )
}

const Dot = ({ onClick, className }: { onClick: () => void; className: string }) => (
  <button onClick={onClick} className={className}>
    <svg width="8" height="8" viewBox="0 0 3 4" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="1.5" cy="2" r="1.5" fill="currentColor" />
    </svg>
  </button>
)
