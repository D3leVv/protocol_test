import cn from "classnames"

interface Props {
  error?: boolean
  success?: boolean
  disabled?: boolean
}

export const containerClasses = ({ error, success }: Props) =>
  cn(
    "flex text-foreground !bg-background rounded-md flex-col text-body2/regular justify-center",
    { "text-red-500": error },
    { "text-green-500": success }
  )

export const inputClasses = ({ error, success, disabled }: Props) =>
  cn(
    "w-full bg-background text-foreground placeholder:text-secondary-400 border placeholder:text-link1/regular rounded-md h-[38px] py-1.5 outline-none ring-0 focus:outline-none focus:ring-secondary-500  !rounded-md",

    {
      "focus:!border-primary-500 border-secondary-300": !error && !success,
      "!border-red-500  focus:!border-red-600  !ring-red-500": error,
      "!border-green-500 focus:!border-green-500": success,
      "opacity-40 cursor-not-allowed": disabled,
    }
  )
