import { Pagination } from "lib/Pagination/Pagination"
import { RegisterForm } from "lib/pages/SigningUp/Register/components/RegisterForm/RegisterForm"
import { cards } from "lib/pages/SigningUp/Register/constants/constants"
import { Info } from "lib/pages/components/Info/Info"
import { Logo } from "lib/pages/components/Logo/Logo"
import { SigningUpContainer } from "lib/pages/components/SingingUpContainer/SigningUpcontainer"
import { V2Card } from "lib/pages/components/V2Card/V2Card"

export const RegisterV2 = () => (
  <SigningUpContainer className="justify-between">
    <div className="flex flex-1 flex-col justify-center gap-10 p-4 lg:flex-none lg:px-40">
      <div className="mx-auto flex w-full flex-col gap-6 lg:w-96">
        <RegisterForm />
      </div>
    </div>
    <div className="hidden h-full min-h-[320px] w-full flex-1 flex-col items-end justify-between rounded-3xl bg-primary-500 text-white lg:flex lg:max-w-[352px] lg:p-10">
      <Logo />
      <div className="flex h-full flex-col justify-center gap-10">
        <Info className="!relative !h-auto items-center justify-center !p-0 text-white" />
        <Pagination options={cards}>{(option) => <V2Card {...option} />}</Pagination>
      </div>
    </div>
  </SigningUpContainer>
)
