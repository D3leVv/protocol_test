"use client"
import React from "react"
import { Theme, toast, ToastOptions, ToastPosition } from "react-toastify"
import "react-toastify/ReactToastify.min.css"

export enum AlertVariant {
  INFO = "info",
  SUCCESS = "success",
  WARN = "warn",
  ERROR = "error",
  DARK = "dark",
  DEFAULT = "default",
}

interface Props {
  variant?: AlertVariant
  message?: React.ReactNode
  autoClose?: number | false
  position?: ToastPosition
}

export const useAlert = () => {
  const addToast = ({
    variant = AlertVariant.INFO,
    message,
    autoClose = 5000,
    position = "top-right",
  }: {
    variant?: AlertVariant
    message?: React.ReactNode
    autoClose?: number | false
    position?: ToastPosition
  }) => {
    const options: ToastOptions = {
      theme: "colored",
      autoClose,
      hideProgressBar: true,
      position,
    }
    if (message) {
      switch (variant) {
        case AlertVariant.INFO:
          return toast.info(message, options)
        case AlertVariant.SUCCESS:
          return toast.success(message, options)
        case AlertVariant.WARN:
          return toast.warn(message, options)
        case AlertVariant.ERROR:
          return toast.error(message, options)
        case AlertVariant.DARK:
          return toast.dark(message, options)
        case AlertVariant.DEFAULT:
          return toast(message, options)
      }
    }
  }

  return { addToast }
}

const toastConfig = (
  props: Props
): {
  theme: Theme
  autoClose?: number | false
  position?: ToastPosition
  hideProgressBar: boolean
} => ({
  theme: "colored",
  autoClose: props.autoClose || 5000,
  hideProgressBar: true,
  position: props.position,
})

export const notification = {
  info: (props: Props) => toast.info(props.message, toastConfig(props)),
  success: (props: Props) => toast.success(props.message, toastConfig(props)),
  warn: (props: Props) => toast.warn(props.message, toastConfig(props)),
  error: (props: Props) => toast.error(props.message, toastConfig(props)),
  dark: (props: Props) => toast.dark(props.message, toastConfig(props)),
  default: (props: Props) => toast(props.message, toastConfig(props)),
}
