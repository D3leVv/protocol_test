import { Card } from "lib/Card/Card"
import { Pagination } from "lib/Pagination/Pagination"
import { Paper } from "lib/Paper/Paper"
import { RegisterForm } from "lib/pages/SigningUp/Register/components/RegisterForm/RegisterForm"
import { cards } from "lib/pages/SigningUp/Register/constants/constants"
import { Info } from "lib/pages/components/Info/Info"
import { Logo } from "lib/pages/components/Logo/Logo"
import { SigningUpContainer } from "lib/pages/components/SingingUpContainer/SigningUpcontainer"

export const RegisterV3 = () => (
  <SigningUpContainer className="!justify-center">
    <div className="flex h-full w-full justify-center lg:hidden">
      <Logo />
    </div>
    <Paper className="items-center !shadow-xl lg:max-w-[560px] lg:p-20">
      <RegisterForm className="w-full" />
    </Paper>
    <div className="flex h-full items-center justify-start">
      <div className="hidden h-full w-full flex-col  items-center justify-center gap-10 lg:flex lg:max-w-[440px]">
        <Info className="!relative !h-auto !text-foreground" />
        <Pagination options={cards}>{(option) => <Card {...option} className="!rounded-xl !p-4" />}</Pagination>
      </div>
    </div>
    <div className="right-10 top-10 hidden lg:fixed lg:block">
      <Logo />
    </div>
  </SigningUpContainer>
)
