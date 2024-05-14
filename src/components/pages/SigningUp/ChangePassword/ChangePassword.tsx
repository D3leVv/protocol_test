import { notification } from "hooks/alert"
import { Button } from "lib/Button/Button"
import { Form, useForm } from "lib/Form/Form"
import { FormPasswordField } from "lib/Form/FormComponents/FormPasswordField/FormPasswordField"
import { Paper } from "lib/Paper/Paper"
import { requiredValidation } from "utils"
import { TopNav } from "../../components/TopNav/TopNav"

export const ChangePassword = () => {
  const form = useForm({
    defaultValues: { password: "", confirmPassword: "" },
  })

  const { control, setError } = form

  const onSubmit = (data: { password: string; confirmPassword: string }) => {
    if (data.password !== data.confirmPassword) {
      notification.error({
        message: "Password and confirm password must be same",
      })
      setError("confirmPassword", {
        message: "Password and confirm password must be same",
      })
      setError("password", {
        message: "Password and confirm password must be same",
      })

      return
    }

    notification.success({ message: JSON.stringify(data) })
    form.reset(data)
  }

  return (
    <div className="h-full w-full bg-background text-foreground">
      <TopNav />
      <div className="flex h-full w-full flex-col items-center justify-center max-lg:p-4 lg:pt-24">
        <Paper className="w-full max-lg:border-none lg:max-w-[512px] lg:!p-10">
          <img src="others/reset-password.svg" alt="change-password" className="h-[180px] w-full" />
          <h2 className="text-center text-h1">Change password</h2>
          <p className="text-center text-body1/regular">Enter a new password below to change password.</p>
          <Form form={form} onSubmit={onSubmit}>
            <div className="mt-6 flex flex-col gap-3 lg:mt-10">
              <FormPasswordField
                name="password"
                control={control}
                label="Password"
                rules={requiredValidation("Password")}
              />
              <FormPasswordField
                name="confirmPassword"
                control={control}
                rules={requiredValidation("Confirm password")}
                label="Confirm password"
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
        </Paper>
      </div>
    </div>
  )
}
