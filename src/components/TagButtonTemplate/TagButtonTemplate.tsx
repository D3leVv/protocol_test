import { XMarkIcon } from "@heroicons/react/24/outline"
import classNames from "classnames"
import { ButtonProps } from "lib/Button/Button"
import {
  BUTTON_BASE_CLASSES,
  BUTTON_IMPACT_CLASSES,
  BUTTON_SHAPE_CLASSES,
  BUTTON_SIZE_CLASSES,
} from "lib/Button/constants"
import { mapIcons } from "lib/InputField/InputField"
import { Tooltip } from "lib/Tooltip/Tooltip"
import { forwardRef } from "react"

export type TagButtonTemplateProps = Omit<ButtonProps<"div">, "onClick"> & {
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export const TagButtonTemplate = forwardRef(
  (
    {
      tooltipText,
      suffixIcon = <XMarkIcon className="h-4 w-4 shrink-0" />,
      variant = "secondary",
      size = "xs",
      children,
      prefixIcon,
      impact = "light",
      className,
      onClick,
      ...rest
    }: TagButtonTemplateProps,
    ref: any
  ) => (
    <div
      ref={ref}
      data-tooltip-content={tooltipText}
      data-tooltip-id="TagButtonTemplate"
      className={classNames(
        BUTTON_BASE_CLASSES,
        BUTTON_SIZE_CLASSES[size],
        BUTTON_IMPACT_CLASSES[variant][impact],
        BUTTON_SHAPE_CLASSES.rounded,
        "relative !flex !w-auto !gap-1 py-1 !pl-3 pr-7 !text-body2/regular !ring-0 ",
        className
      )}
      onClick={onClick}
      {...rest}
    >
      {prefixIcon && mapIcons(prefixIcon)}
      {children}{" "}
      <span className="absolute right-0 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">{suffixIcon}</span>
      <Tooltip contentId="tag-button" title={tooltipText} />
    </div>
  )
)
