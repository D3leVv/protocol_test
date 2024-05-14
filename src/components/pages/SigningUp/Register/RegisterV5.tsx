import { Logo } from "../../components/Logo/Logo"
import { SigningUpContainer } from "../../components/SingingUpContainer/SigningUpcontainer"
import { RegisterForm } from "./components/RegisterForm/RegisterForm"

export const RegisterV5 = () => (
  <SigningUpContainer className="relative !p-0 lg:justify-between">
    <div className="z-10 flex w-full flex-1 items-center justify-center rounded-r-3xl bg-background">
      <RegisterForm className="w-full" showLogo />
    </div>
    <div className="flex flex-1 justify-end text-gray-900 max-lg:hidden">
      <div className="z-10 flex max-w-[500px] flex-col items-end gap-6 p-10 text-right">
        <Logo />
        <h2 className="text-h1">
          Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.
        </h2>
        <p className="text-body2/regular">Gorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
      <img loading="lazy" src="img/sign-in.jpeg" alt="" className="absolute aspect-auto h-full w-[56%] object-cover" />
    </div>
  </SigningUpContainer>
)
