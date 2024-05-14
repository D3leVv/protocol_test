import { Modal } from "lib/Modal/Modal"
import { useSliderContext } from "./context"

export const SliderTitle = () => {
  const { title } = useSliderContext()
  return (
    <Modal.Title className="mb-10" titleClassName="text-h4">
      {title}
    </Modal.Title>
  )
}
