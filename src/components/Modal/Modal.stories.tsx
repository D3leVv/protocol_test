import type { Meta, StoryFn } from "@storybook/react"

import { CheckIcon } from "@heroicons/react/24/solid"
import { Button } from "lib/Button/Button"
import { Modal, ModalProps, useModal } from "./Modal"

const meta: Meta<ModalProps> = {
  title: "Components/Feedback/Modal",
  component: Modal,
  argTypes: {},
}

export default meta

const Template: StoryFn<ModalProps> = () => {
  const modalMethods = useModal()

  return (
    <>
      <Button onClick={modalMethods.openModal}>Open modal</Button>
      <Modal {...modalMethods}>
        <Modal.Background />
        <Modal.ContentWrapper>
          <Modal.Title>Modal</Modal.Title>
          <div className="flex flex-col items-center justify-center gap-8 text-foreground">
            <CheckIcon className="h-11 w-11 rounded-full bg-green-500 p-2 text-white" />
            <div className="text-center">
              <h4 className="text-body1/medium">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h4>
              <p className="text-center">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tempus urna pellentesque rutrum nunc sit
                tristique sapien.{" "}
              </p>
            </div>
            <div className="grid w-full grid-cols-2 gap-2">
              <Button variant="secondary" onClick={modalMethods.closeModal}>
                Button text
              </Button>
              <Button onClick={modalMethods.closeModal}>Button text</Button>
            </div>
          </div>
        </Modal.ContentWrapper>
      </Modal>
    </>
  )
}
export const Default = Template.bind({})

const OneButton: StoryFn<ModalProps> = () => {
  const modalMethods = useModal()

  return (
    <>
      <Button onClick={modalMethods.openModal}>Open modal</Button>
      <Modal {...modalMethods}>
        <Modal.Background />
        <Modal.ContentWrapper>
          <Modal.Title>Modal</Modal.Title>
          <div className="flex flex-col items-center justify-center gap-8">
            <CheckIcon className="h-11 w-11 rounded-full bg-green-500 p-2 text-white" />
            <div className="text-center">
              <h4 className="text-body1/medium">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h4>
              <p className="text-center text-secondary-500">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tempus urna pellentesque rutrum nunc sit
                tristique sapien.{" "}
              </p>
            </div>
            <div className="grid w-full ">
              <Button onClick={modalMethods.closeModal}>Button text</Button>
            </div>
          </div>
        </Modal.ContentWrapper>
      </Modal>
    </>
  )
}

export const OneBTN = OneButton.bind({})
