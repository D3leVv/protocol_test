import classNames from "classnames"
import DOMPurify from "dompurify"

interface Props {
  text: string | undefined
  className?: string
}

export const Prose = ({ text = "", className }: Props) => (
  <div
    className={classNames(
      className,
      "prose prose-p:text-[var(--secondary-900)] prose-p:text-body2/regular prose-h4:text-body2/medium prose-a:text-primary-500 prose-a:text-link1/regular prose-span:text-body2/regular prose-li:text-body2/regular prose-img:w-[84px] prose-img:h-30 min-w-full marker:text-[var(--secondary-500)]"
    )}
    dangerouslySetInnerHTML={{
      __html: DOMPurify.sanitize(text),
    }}
  />
)
