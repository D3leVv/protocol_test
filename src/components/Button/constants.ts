import { ElementType } from "react"
import { ButtonProps } from "./Button"

export const BUTTON_BASE_CLASSES =
  "inline-flex w-full items-center relative touch-none disabled:cursor-default select-none text-center gap-x-2 shrink-0 justify-center focus:outline-none focus:!ring-2 focus:!ring-indigo-500 focus:ring-offset-2 active:translate-y-px disabled:pointer-events-none disabled:opacity-50"

export const BUTTON_IMPACT_CLASSES: Record<
  NonNullable<ButtonProps<ElementType>["variant"]>,
  Record<NonNullable<ButtonProps<ElementType>["impact"]>, string>
> = {
  primary: {
    bold: "border border-secondary-300 shadow-sm text-white bg-primary-500 hover:bg-primary-700 ",
    light: "border border-secondary-300 shadow-sm text-primary-500 bg-secondary hover:bg-secondary-50  ",
    none: "text-primary-500 bg-transparent hover:bg-secondary-50  !shadow-none",
    // todo
    link: "",
  },
  secondary: {
    bold: "border border-secondary-300 shadow-sm text-white bg-secondary-500 hover:bg-secondary-700 focus:ring-secondary-500",
    light:
      "border border-secondary-300 shadow-sm text-foreground bg-secondary hover:bg-secondary-50 focus:ring-secondary-500",
    none: "text-foreground bg-transparent hover:bg-secondary-50 focus:ring-secondary-500 !shadow-none",
    // todo
    link: "",
  },
  text: {
    bold: "text-white bg-secondary-500 hover:bg-secondary-700 focus:ring-secondary-500 ",
    light: "!text-primary-500 bg-secondary hover:bg-secondary-50 focus:ring-secondary-500 ",
    none: "!text-primary-500 bg-transparent border-transparent   !shadow-none",
    link: "!text-primary-500 bg-transparent border-transparent   !shadow-none underline !text-body2/regular",
  },
  // error
  green: {
    bold: "border border-secondary-300 shadow-sm text-white bg-green-500 hover:bg-green-700 focus:ring-green-500",
    light:
      "border border-secondary-300 shadow-sm text-green-500 bg-secondary hover:bg-secondary-50 focus:ring-green-500",
    none: "text-green-500 bg-transparent hover:bg-secondary-50 focus:ring-green-500 !shadow-none",
    //todo
    link: "",
  },

  error: {
    bold: "border border-secondary-300 shadow-sm text-white bg-red-500 hover:bg-red-700 focus:ring-red-500",
    light:
      "border border-secondary-300 shadow-sm text-red-500 bg-background border-red-500 hover:bg-secondary-50 focus:ring-red-500",
    none: "text-red-500 border-red-500 bg-transparent hover:bg-secondary-50 focus:ring-red-500 !shadow-none",
    //todo
    link: "",
  },

  custom: {
    bold: "border border-secondary-300 shadow-sm text-white bg-primary-500 hover:bg-primary-700 ",
    light: "border border-secondary-300 shadow-sm text-primary-500 bg-background hover:bg-secondary-50 ",
    none: "text-primary-500 bg-transparent hover:bg-secondary-50  !shadow-none",
    //todo
    link: "",
  },
}

export const BUTTON_SIZE_CLASSES: Record<NonNullable<ButtonProps<ElementType>["size"]>, string> = {
  xs: "px-2 py-2 w-7 h-7 text-button3/semibold",
  sm: "px-2.5 py-2.5 w-9 h-9 text-button2/semibold",
  md: "px-3 py-3 h-[38px] w-[38px] text-button2/semibold",
  lg: "px-3.5 py-3.5 h-12 w-12 text-button1/semibold",
  xl: "px-4 py-4  h-[52px] w-[52px] text-button1/semibold",
}

export const BUTTON_SHAPE_CLASSES: Record<NonNullable<ButtonProps<ElementType>["shape"]>, string> = {
  square: "rounded-none",
  rounded: "rounded-md",
  pill: "rounded-full",
}

export const BUTTON_FOCUS_CLASSES: Record<NonNullable<ButtonProps<ElementType>["focus"]>, string> = {
  none: "",
  outline: "ring-2 ring-offset-2 ring-primary-500",
  shadow: "shadow-sm",
}
