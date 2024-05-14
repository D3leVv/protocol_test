import { forwardRef, PropsWithChildren } from "react"

export type LabelProps = PropsWithChildren<{
  label: string | React.ReactNode
  required?: boolean
  id?: string
}>

export const Label = forwardRef<HTMLLabelElement, LabelProps>(({ id, label, required }, ref) => (
  <label htmlFor={id} ref={ref} className="block text-body2/medium leading-6 !text-foreground">
    {label}
    {required && <span className="relative -top-1 font-light text-red-500">&lowast;</span>}
  </label>
))
Label.displayName = "Label"
