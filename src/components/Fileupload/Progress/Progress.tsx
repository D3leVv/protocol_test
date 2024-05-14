"use client"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { Progressbar } from "components/Progressbar/Progressbar"

export interface ProgressProps {
  tooltipText?: string
  tooltipPosition?: "top" | "bottom" | "left" | "right"
  progress: number
  bgColor?: string
  barColor?: string
  height?: number
  fileName: string
  cancelUpload: () => void
  id?: string
  uploadSpeed: number
}

export const Progress = (props: ProgressProps) => {
  const { fileName, cancelUpload, id = "Progress", uploadSpeed, ...rest } = props

  return (
    <div
      data-testid={id}
      className="text-body3/regular flex flex-col gap-1 rounded-md border-2 border-dashed border-secondary-100 p-4 text-foreground "
    >
      <div className="mb-1 flex w-full items-center justify-between">
        <p className="">{props.fileName}</p>
        <button className="cursor-pointer text-secondary-500 hover:text-foreground" onClick={cancelUpload}>
          <XMarkIcon className="h-5 w-5 " />
        </button>
      </div>
      <Progressbar {...rest} />
      <div className="mb-2 flex w-full items-center justify-between text-secondary-500">
        <p>{props.progress}% Complete</p>
        <p>{uploadSpeed.toFixed(2)} KB/sec</p>
      </div>
    </div>
  )
}
