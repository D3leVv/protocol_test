import { StarIcon } from "@heroicons/react/24/solid"
import classNames from "classnames"

export const Info = ({ className }: { className?: string }) => (
  <div
    className={classNames(
      "absolute z-10 flex h-full w-full flex-col gap-4 p-10 text-body2/regular text-gray-900 lg:p-14",
      className
    )}
  >
    <h4 className="text-h4">Porem ipsum dolor sit amet, consectetur adipiscing elit.</h4>
    <p className="">
      Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio
      mattis.
    </p>
    <p className="flex w-full items-center gap-2">
      <span className="">4.9 Rating</span>
      <StarIcon className="h-4 w-4" />
      <span>Trustpilot</span>
    </p>
  </div>
)
