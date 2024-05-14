import { Switch as HeadlessSwitch } from "@headlessui/react"
import classNames from "classnames"

export interface SwitchProps {
  enabled: boolean
  disabled?: boolean
  onChange: (enabled: boolean) => void
  className?: string
  label?: string
  helperText?: string
  labelPosition?: "left" | "right"
  passive?: boolean
}

export const Switch = ({
  enabled,
  onChange,
  className,
  disabled,
  label,
  helperText,
  passive,
  labelPosition = "right",
}: SwitchProps) => {
  const handleChange = (enabled: boolean) => {
    if (!disabled) {
      onChange(enabled)
    }
  }

  const labelElement = label && (
    <HeadlessSwitch.Label passive={passive} className="text-body2/regular text-foreground ">
      {label}
    </HeadlessSwitch.Label>
  )

  const helperTextElement = helperText && (
    <HeadlessSwitch.Description className="text-body3/regular text-secondary-500">
      {helperText}
    </HeadlessSwitch.Description>
  )

  return (
    <HeadlessSwitch.Group
      as="div"
      className={classNames(
        "flex w-auto gap-4 gap-x-2.5 text-primary-900",
        {
          "flex-row-reverse": labelPosition === "left",
          "flex-row": labelPosition === "right",
        },
        className,
        {
          "opacity-50 ": disabled,
        }
      )}
    >
      <HeadlessSwitch
        checked={enabled}
        onChange={handleChange}
        disabled={disabled}
        className={classNames(
          "group inline-flex rounded-full outline-none  focus-visible:ring-2 focus-visible:ring-primary-500  focus-visible:ring-offset-2",
          {
            "!cursor-not-allowed opacity-50": disabled,
          }
        )}
      >
        <span className="sr-only">Toggle switch</span>
        <div
          className={classNames(
            " transition-color h-5 w-8 rounded-full border-2 border-transparent bg-secondary-300 group-data-[headlessui-state='checked']:bg-primary-500"
          )}
        >
          <div
            className={classNames(
              "shadow-base h-4 w-4 rounded-full bg-background shadow transition-all group-data-[headlessui-state='checked']:ml-3"
            )}
          />
        </div>
      </HeadlessSwitch>
      <div className={classNames("flex flex-col justify-start gap-0.5 text-foreground")}>
        {labelElement}
        {helperTextElement}
      </div>
    </HeadlessSwitch.Group>
  )
}
