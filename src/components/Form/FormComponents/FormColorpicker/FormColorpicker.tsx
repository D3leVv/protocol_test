"use client"
import { Colorpicker, ColorpickerProps } from "components/Colorpicker/Colorpicker"
import { FieldValues, UseControllerProps, useController } from "react-hook-form"

export const FormColorpicker = <T extends FieldValues>(
  props: UseControllerProps<T> & Omit<ColorpickerProps, "onChange" | "color">
) => {
  const {
    field: { onChange, value },
  } = useController(props)
  return <Colorpicker onChange={onChange} color={value} />
}
