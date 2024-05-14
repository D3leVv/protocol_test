import classNames from "classnames"
import { Tooltip } from "lib/Tooltip/Tooltip"
import React, { useEffect, useRef, useState } from "react"

interface Props {
  content: React.ReactNode
  contentId: string
  className?: string
  style?: React.CSSProperties
}

export const EllipsisWithTooltip = ({ content, style, className, contentId }: Props) => {
  const [isTruncated, setIsTruncated] = useState(false)
  const textElement = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkIfTruncated = () => {
      if (textElement.current) {
        setIsTruncated(textElement.current.offsetWidth < textElement.current.scrollWidth)
      }
    }

    window.addEventListener("resize", checkIfTruncated)
    checkIfTruncated()

    return () => {
      window.removeEventListener("resize", checkIfTruncated)
    }
  }, [content])

  return (
    <div
      key={contentId}
      data-tooltip-id={contentId}
      ref={textElement}
      style={style}
      className={classNames("truncate", className)}
    >
      {content}
      <Tooltip contentId={contentId} place="top" hidden={!isTruncated} title={content} />
    </div>
  )
}
