import { Transition, TransitionChildProps } from "@headlessui/react"
import { Fragment, PropsWithChildren } from "react"

type Props = PropsWithChildren<{
  transitionProps?: TransitionChildProps<any>
  show?: boolean
}>

export const TransitionComponent = ({ transitionProps, children, show }: Props) => (
  <Transition
    as={Fragment}
    show={show}
    appear={transitionProps?.appear}
    enter={transitionProps?.enter ? transitionProps.enter : "ease-out duration-100"}
    enterFrom={transitionProps?.enterFrom ? transitionProps.enterFrom : "opacity-0 scale-95"}
    enterTo={transitionProps?.enterTo ? transitionProps.enterTo : "opacity-100 scale-100"}
    leave={transitionProps?.leave ? transitionProps.leave : "ease-in duration-100"}
    leaveFrom={transitionProps?.leaveFrom ? transitionProps.leaveFrom : "opacity-100 scale-100"}
    leaveTo={transitionProps?.leaveTo ? transitionProps.leaveTo : "opacity-0 scale-95"}
    afterEnter={transitionProps?.afterEnter}
    afterLeave={transitionProps?.afterLeave}
    beforeEnter={transitionProps?.beforeEnter}
    beforeLeave={transitionProps?.beforeLeave}
  >
    {children}
  </Transition>
)
