import { Button, ButtonProps } from "lib/Button/Button"
import { Form } from "lib/Form/Form"
import { Modal, ModalProps } from "lib/Modal/Modal"
import { ComponentProps, ReactNode } from "react"
import { FieldValues, SubmitHandler, UseFormReturn } from "react-hook-form"

type FormModalProps<T extends FieldValues = any> = Omit<ComponentProps<"form">, "onSubmit"> &
  ModalProps & {
    openModalButtonProps: Omit<ButtonProps<"button">, "onClick" | "type">
    title?: string
    form: UseFormReturn<T>
    onSubmit: SubmitHandler<T>
    loading?: boolean
    disabled?: boolean
    children?: ReactNode
  }

export const FormModal = <T extends FieldValues>(props: FormModalProps<T>) => {
  return (
    <>
      <div className="flex">
        <Button type="button" id="open-form-modal" onClick={props.openModal} {...props.openModalButtonProps} />
      </div>
      <Modal openModal={props.openModal} closeModal={props.closeModal} isOpen={props.isOpen}>
        <Modal.Background />
        <Modal.ContentWrapper>
          {props.title && <Modal.Title>{props.title}</Modal.Title>}
          <Form form={props.form} onSubmit={props.onSubmit}>
            <div className="flex flex-col gap-y-4">
              {props.children}
              <div className="mt-4 flex items-center justify-end">
                <div className="grid grid-cols-2 gap-3">
                  <Button impact="none" variant="secondary" type="button" onClick={props.closeModal}>
                    Cancel
                  </Button>
                  <Button id="submit-button" loading={props.loading} disabled={props.disabled}>
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        </Modal.ContentWrapper>
      </Modal>
    </>
  )
}
