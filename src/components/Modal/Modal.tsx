// TODO: break down components, context, and types into separate files. Move hook to hooks folder. See calendar component for example.
"use client"
import { Dialog, Transition, TransitionChildProps } from "@headlessui/react"
import { XMarkIcon } from "@heroicons/react/24/outline"
import classNames from "classnames"
import React, { Fragment, RefObject, createContext, useContext, useState } from "react"

export interface ModalProps {
  children?: React.ReactNode
  isOpen: boolean
  closeModal(): void
  openModal(): void
  className?: string
}

interface Context {
  closeModal: () => void
  openModal: () => void
  initialFocus: RefObject<HTMLDivElement>
}

const ModalContext = createContext<Context | undefined>(undefined)

const useModalContext = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error("Modal components must be used within a Modal component")
  }
  return context
}

function Modal(props: ModalProps) {
  const initialFocus = React.useRef<HTMLDivElement>(null)
  return (
    <Transition appear show={props.isOpen} as={Fragment}>
      <Dialog
        initialFocus={initialFocus}
        onClose={props.closeModal}
        as="div"
        className={classNames("relative z-[999]", props.className)}
      >
        <ModalContext.Provider
          value={{
            closeModal: props.closeModal,
            openModal: props.openModal,
            initialFocus,
          }}
        >
          {props.children}
        </ModalContext.Provider>
      </Dialog>
    </Transition>
  )
}

Modal.Background = function Background(props: {
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <Transition.Child
      as={Fragment}
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        style={props.style}
        className={classNames("fixed inset-0 overflow-hidden bg-black bg-opacity-25 backdrop-blur-sm", props.className)}
      />
    </Transition.Child>
  )
}

Modal.ContentWrapper = function ContentWrapper({
  children,
  className,
  dialogClassName,
  transitionProps,
}: {
  children: React.ReactNode
  className?: string
  dialogClassName?: string
  transitionProps?: TransitionChildProps<any>
}) {
  return (
    <Transition.Child
      as={Fragment}
      enter={transitionProps?.enter ? transitionProps.enter : "ease-out duration-300"}
      enterFrom={transitionProps?.enterFrom ? transitionProps.enterFrom : "opacity-0 scale-95"}
      enterTo={transitionProps?.enterTo ? transitionProps.enterTo : "opacity-100 scale-100"}
      leave={transitionProps?.leave ? transitionProps.leave : "ease-in duration-200"}
      leaveFrom={transitionProps?.leaveFrom ? transitionProps.leaveFrom : "opacity-100 scale-100"}
      leaveTo={transitionProps?.leaveTo ? transitionProps.leaveTo : "opacity-0 scale-95"}
    >
      <div className="fixed inset-0">
        <div className={classNames(`flex items-center justify-center overflow-x-hidden text-center`, className)}>
          <Dialog.Panel
            className={classNames(
              `scrollbar-hide h-full max-h-[93vh] w-full max-w-md overflow-y-auto rounded-md border border-secondary-100 bg-background p-6 text-left align-middle shadow-lg lg:my-10 lg:min-w-[600px]`,
              dialogClassName
            )}
          >
            {children}
          </Dialog.Panel>
        </div>
      </div>
    </Transition.Child>
  )
}

Modal.Title = function Title({
  children,
  className,
  titleClassName,
}: {
  children: React.ReactNode
  className?: string
  titleClassName?: string
}) {
  const { closeModal } = useModalContext()

  return (
    <div className={classNames("mb-10 flex w-full flex-row items-center gap-[10px] p-0 text-left", className)}>
      <Dialog.Title className={classNames("w-full text-h2 text-foreground", titleClassName)}>{children}</Dialog.Title>
      <button className="cursor-pointer" onClick={closeModal}>
        <XMarkIcon className="h-4 w-4" />
      </button>
    </div>
  )
}

function useModal(open = false) {
  const [isOpen, setIsOpen] = useState(open)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  return { isOpen, openModal, closeModal }
}

export { Modal, useModal }
