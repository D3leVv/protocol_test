import { SigningUpContainer } from "../../components/SingingUpContainer/SigningUpcontainer"
import { RegisterForm } from "./components/RegisterForm/RegisterForm"

export const RegisterV6 = () => (
  <SigningUpContainer className="relative !p-0 lg:justify-between">
    <div className="relative z-10 flex w-full flex-1 items-center justify-center rounded-r-3xl bg-background">
      <RegisterForm className="z-10 w-full" showLogo />
      <svg
        className="absolute inset-y-0 hidden h-full w-full translate-x-1/2 transform fill-background lg:block"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <polygon points="0,0 90,0 50,100 0,100" />
      </svg>
    </div>
    <div className="flex flex-1 justify-end text-gray-900 max-lg:hidden">
      <div className="z-10 flex max-w-[500px] flex-col items-end gap-6 p-10 text-right"></div>
      <img loading="lazy" src="img/sign-in.jpeg" alt="" className="absolute aspect-auto h-full w-[55%] object-cover" />
    </div>
  </SigningUpContainer>
)
