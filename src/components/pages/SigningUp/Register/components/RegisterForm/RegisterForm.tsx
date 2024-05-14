import classNames from "classnames"
import { notification } from "hooks/alert"
import { Button } from "lib/Button/Button"
import { Form, useForm } from "lib/Form/Form"
import { FormCheckbox } from "lib/Form/FormComponents/FormCheckbox/FormCheckbox"
import { FormInputField } from "lib/Form/FormComponents/FormInputField/FormInputField"
import { FormPasswordField } from "lib/Form/FormComponents/FormPasswordField/FormPasswordField"
import { useFormattedMessage } from "lib/Translate/FormattedMessage"
import { Logo } from "lib/pages/components/Logo/Logo"
import { Title } from "lib/pages/components/Title/Title"
import { emailValidation, requiredValidation } from "utils"

export const RegisterForm = ({ showLogo, className }: { showLogo?: boolean; className?: string }) => {
  const { formatMessage } = useFormattedMessage()
  const form = useForm({
    defaultValues: {
      fullName: "asdasdas",
      email: "asdasd@asdas.com",
      password: "asdasd",
      confirmPassword: "asdasd",
      confirm: false,
    },
  })
  const { control } = form
  const onSubmit = (data: any) => {
    notification.success({ message: JSON.stringify(data) })
  }
  return (
    <div className={classNames("flex flex-1 flex-col justify-center gap-10 p-4", className)}>
      <div className="mx-auto flex w-full flex-col gap-6 lg:w-96">
        {showLogo && <Logo />}
        <Title title={formatMessage({ id: "AUTH.REGISTER.TITLE" })} description="Start your journey with our product" />

        <Form form={form} onSubmit={onSubmit}>
          <div className="flex flex-col gap-2">
            <FormInputField
              name="fullName"
              label="Full name"
              rules={requiredValidation("Full name")}
              control={control}
              defaultValue=""
            />
            <FormInputField
              name="email"
              label="Email"
              rules={emailValidation("Please enter a valid email", "Email")}
              control={control}
              defaultValue=""
            />
            <FormPasswordField
              name="password"
              label="Password"
              rules={requiredValidation("Password")}
              control={control}
              defaultValue=""
            />
            <FormPasswordField
              name="confirmPassword"
              label="Confirm Password"
              rules={requiredValidation("Password")}
              control={control}
              defaultValue=""
            />
            <div className="mt-6 flex flex-col gap-4">
              <FormCheckbox name="confirm" label="Remember me" control={control} defaultValue={""} />

              <Button type="submit">Sign in</Button>
              <Button variant="secondary" impact="light" prefixIcon={<img src="icons/google.svg" />} type="button">
                Sing in with Google
              </Button>
            </div>
          </div>
        </Form>
        <p className="">
          Already have an account?{" "}
          <a href="#" className="font-semibold leading-6 text-primary-500 hover:text-primary-400">
            Sign in
          </a>
        </p>
      </div>
    </div>
  )
}
