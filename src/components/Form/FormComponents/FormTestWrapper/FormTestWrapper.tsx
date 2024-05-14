import { notification } from "hooks/alert"
import { Button } from "lib/Button/Button"
import { Form, useForm } from "lib/Form/Form"
import { Paper } from "lib/Paper/Paper"
import { ReactNode } from "react"
import { addPropsToChildren } from "utils"

export const FormTestWrapper = ({ children }: { children: ReactNode }) => {
  const form = useForm({ defaultValues: { test: [] } })
  const onSubmit = (data: any) => {
    notification.success({ message: JSON.stringify(data) })
    form.reset(data)
  }
  const handleCancel = () => {
    form.reset()
  }
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Paper>
        <Form onSubmit={onSubmit} form={form}>
          <div className="flex flex-col gap-4">
            {addPropsToChildren({
              children,
              props: { control: form.control },
            })}
            <div className="grid grid-cols-2 gap-4">
              <Button
                type="button"
                variant="secondary"
                impact="light"
                onClick={handleCancel}
                disabled={!form.formState.isDirty}
              >
                Cancel
              </Button>
              <Button disabled={!form.formState.isDirty} className="w-full">
                Submit
              </Button>
            </div>
          </div>
        </Form>
      </Paper>
    </div>
  )
}
