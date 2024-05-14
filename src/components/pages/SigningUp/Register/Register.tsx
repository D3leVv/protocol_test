import { RegisterForm } from "lib/pages/SigningUp/Register/components/RegisterForm/RegisterForm"
import { Info } from "lib/pages/components/Info/Info"
import { SigningUpContainer } from "lib/pages/components/SingingUpContainer/SigningUpcontainer"

export const Register = () => (
  <SigningUpContainer>
    <RegisterForm showLogo />
    <div className="relative hidden min-h-[320px] w-full flex-1 flex-col rounded-3xl lg:flex lg:overflow-hidden lg:rounded-r-none">
      <Info />
      <img
        loading="lazy"
        className="absolute inset-0 h-full w-full rounded-3xl object-cover lg:rounded-r-none"
        src="img/sign-in.jpeg"
        alt=""
      />
    </div>
  </SigningUpContainer>
)
