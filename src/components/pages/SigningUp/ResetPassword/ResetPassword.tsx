import { notification } from "hooks/alert"
import { Button } from "lib/Button/Button"
import { Form, useForm } from "lib/Form/Form"
import { FormInputField } from "lib/Form/FormComponents/FormInputField/FormInputField"
import { Paper } from "lib/Paper/Paper"
import { useState } from "react"
import { emailValidation } from "utils"
import { TopNav } from "../../components/TopNav/TopNav"

export const ResetPassword = ({ passwordReseted }: { passwordReseted?: boolean }) => {
  const [pReseted, setPReseted] = useState(passwordReseted || false)
  const form = useForm({ defaultValues: { email: "" } })

  const { control } = form

  const onSubmit = (data: { email: string }) => {
    notification.success({ message: JSON.stringify(data) })
    form.reset(data)
    setPReseted(true)
  }

  return (
    <div className="h-full w-full bg-background text-foreground">
      <TopNav />
      <div className="flex h-full w-full flex-col items-center justify-center max-lg:p-4 lg:pt-24">
        <Paper className="w-full max-lg:border-none lg:max-w-[512px] lg:!p-10">
          {!pReseted ? (
            <img src="others/forgot-password.svg" alt="forgot-password" className="h-[180px] w-full" />
          ) : (
            <img src="others/forgot-password-success.svg" alt="reset-password" className="h-[180px] w-full" />
          )}
          <h2 className="text-center text-h1">
            {pReseted ? "Security link has been sent to your inbox" : "Reset your password"}
          </h2>
          <p className="text-center text-body1/regular">
            {pReseted
              ? "Hurry up! This link is valid only for 30 minutes."
              : "We will send a link to your email to reset the password to your account."}
          </p>
          {pReseted ? (
            <div className="w-full">
              <Button>Back to log in</Button>
            </div>
          ) : (
            <Form form={form} onSubmit={onSubmit}>
              <div className="mt-6 flex flex-col gap-3 lg:mt-10">
                <FormInputField
                  name="email"
                  label="Email"
                  type="email"
                  control={control}
                  required
                  rules={emailValidation("Email is required", "Email")}
                />
                <Button size="md">Reset Password</Button>

                <p className="text-center">
                  Remember your password?{" "}
                  <a href="#" className="font-semibold leading-6 text-primary-500 hover:text-primary-400">
                    Login
                  </a>
                </p>
              </div>
            </Form>
          )}
        </Paper>
      </div>
    </div>
  )
}
