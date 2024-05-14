import classNames from "classnames"
import { CardProps } from "lib/Card/Card"

export const V2Card = (props: CardProps & { className?: string }) => (
  <div className={classNames("flex flex-col gap-3 rounded-lg bg-white/10 p-4", props.className)}>
    <h2 className="text-body2/medium">{props.titlePrefix}</h2>
    {props.description && <p className="text-body3/regular">{props.description}</p>}
  </div>
)
