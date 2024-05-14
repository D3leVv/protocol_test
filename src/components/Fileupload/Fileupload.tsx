import { motion } from "framer-motion"
import { Tooltip } from "lib/Tooltip/Tooltip"
import React, { useCallback, useRef, useState } from "react"

import { DocumentArrowUpIcon } from "@heroicons/react/24/outline"
import classNames from "classnames"

export interface FileuploadProps {
  tooltipText?: string
  tooltipPosition?: "top" | "bottom" | "left" | "right"
  label?: string
  onUpload: (files: File[]) => void
  multiple?: boolean
}

export const Fileupload = ({ tooltipPosition, tooltipText, onUpload, multiple }: FileuploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setIsDragging(false)
      const files = Array.from(e.dataTransfer.files)

      if (!multiple) {
        // you can choose witch file to upload this if drag and drop is used instead of native upload of files
        onUpload([files[0]])
      } else {
        onUpload(files)
      }
    },
    [onUpload, multiple]
  )
  //handles native file upload
  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files !== null) {
        const files = Array.from(e.target.files)
        onUpload(files)
      }
    },
    [onUpload]
  )

  return (
    <>
      <div
        data-tooltip-id="Fileupload"
        data-tooltip-content={tooltipText}
        data-tooltip-place={tooltipPosition}
        className="flex flex-col gap-2"
      >
        {/* drag and drop area */}

        <motion.div
          role="document"
          aria-label="Drag and drop area"
          className={classNames(
            "animate-color relative flex cursor-pointer flex-col items-center justify-center gap-1 rounded-md border-2 border-dashed border-secondary-100 p-6 text-body2/regular text-foreground outline-none duration-150 target:border-primary-500 focus-within:border-blue-500 hover:border-primary-500 focus:border-blue-500 focus-visible:border-blue-500 focus-visible:!outline-none active:border-blue-500",

            isDragging ? " border-primary-500" : "border-secondary-100"
          )}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input
            type="file"
            multiple={multiple}
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          />
          <DocumentArrowUpIcon className="h-12 w-12 stroke-[0.8] text-secondary-600" />
          <p className="text-center">
            {isDragging ? (
              "Drop files here"
            ) : (
              <>
                <span className="text-body2/medium text-primary-500">Upload a file </span> <span>or drag and drop</span>{" "}
              </>
            )}
          </p>
          <p className="text-secondary-500">PNG, JPG, GIF up to 10MB</p>
        </motion.div>
      </div>
      <Tooltip contentId="Fileupload" title={tooltipText} />
    </>
  )
}
