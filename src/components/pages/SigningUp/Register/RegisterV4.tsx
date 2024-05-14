import { Paper } from "lib/Paper/Paper"
import { Logo } from "../../components/Logo/Logo"
import { SigningUpContainer } from "../../components/SingingUpContainer/SigningUpcontainer"
import { RegisterForm } from "./components/RegisterForm/RegisterForm"

export const RegisterV4 = () => (
  <SigningUpContainer className="bg-[url('img/sign-in.jpeg')] bg-cover bg-center bg-no-repeat lg:justify-between">
    <Paper className="mx-auto !w-full flex-1 items-center !shadow-xl lg:max-w-[560px] lg:p-20">
      <RegisterForm className="w-full" />
    </Paper>
    <div className="hidden max-w-[500px] flex-col items-end gap-6 p-10 pt-0 text-right text-gray-900 lg:flex">
      <Logo />
      <h2 className="text-h1">
        Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.
      </h2>
      <p className="text-body2/regular">Gorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </div>
  </SigningUpContainer>
)
