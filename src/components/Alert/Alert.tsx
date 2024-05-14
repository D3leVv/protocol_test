import { XMarkIcon } from "@heroicons/react/24/outline"
import classNames from "classnames"
import { CONTEXT_CLASS, PROGRESS_CLASS } from "lib/Alert/constants"
import React, { PropsWithChildren } from "react"
import { ToastContainer, ToastContainerProps } from "react-toastify"

export interface AlertProps extends PropsWithChildren<ToastContainerProps> {
  variant?: "info" | "success" | "warn" | "error" | "dark"
  message?: React.ReactNode
}

export const Alert = ({ variant, ...props }: AlertProps) => (
  <ToastContainer
    data-testid="alert"
    closeButton={(close) => (
      <button onClick={close.closeToast} className="">
        <XMarkIcon className="h-5 w-5" />
      </button>
    )}
    {...props}
    toastClassName={(context) =>
      classNames(
        "relative !flex p-3 text-body3/regular w-full !h-full rounded-md items-center justify-center cursor-pointer my-2 ",
        CONTEXT_CLASS[context?.type || "default"]
      )
    }
    progressClassName={() =>
      classNames(
        PROGRESS_CLASS[variant || "default"],
        "Toastify__progress-bar Toastify__progress-bar--animated Toastify__progress-bar-theme--colored"
      )
    }
  />
)
