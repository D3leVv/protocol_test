import classNames from "classnames"
import { motion } from "framer-motion"

interface Props {
  className?: string
}

export const Spinner = ({ className }: Props) => (
  <motion.div
    role="progressbar"
    animate={{
      rotate: 360,
      filter: "blur(0.3px)",
    }}
    transition={{
      duration: 1.1,
      repeat: Infinity,
      ease: "linear",
      repeatType: "loop",
    }}
    className={classNames("h-5 w-5", className)}
  >
    <svg className="h-full w-full " viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 18V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M4.93 4.93L7.76 7.76"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.24 16.24L19.07 19.07"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M2 12H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M4.93 19.07L7.76 16.24"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.24 7.76L19.07 4.93"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </motion.div>
)
