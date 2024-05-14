"use client"

// We will fully type `<Form />` component by providing component props and fwding // those
import classNames from "classnames"
import { ComponentProps } from "react"
import {
  FieldValues,
  // context provider for our form
  FormProvider,
  // type of submit handler event
  SubmitHandler,
  // return type of useHookForm hook
  UseFormReturn,
  // hook that would return errors in current instance of form
  useFormContext,
  useForm as useHookForm,
} from "react-hook-form"
import { findValueByKey } from "../../utils"

export const useForm = useHookForm

// we omit the native `onSubmit` event in favor of `SubmitHandler` event
// the beauty of this is, the values returned by the submit handler are fully typed

interface FormProps<T extends FieldValues = any> extends Omit<ComponentProps<"form">, "onSubmit"> {
  form: UseFormReturn<T>
  onSubmit: SubmitHandler<T>
}

export const Form = <T extends FieldValues>({ form, onSubmit, children, ...props }: FormProps<T>) => {
  return (
    <FormProvider {...form}>
      {/* the `form` passed here is return value of useForm() hook */}
      <form
        className={classNames(props.className, "w-full")}
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
        {...props}
      >
        <fieldset
          //  We disable form inputs when we are submitting the form!! A tiny detail
          //        that is missed a lot of times
          disabled={form.formState.isSubmitting}
        >
          {children}
        </fieldset>
      </form>
    </FormProvider>
  )
}

export const FieldError = ({ name, id }: { name?: string; id?: string }) => {
  // the useFormContext hook returns the current state of hook form.
  // we can use this to get the errors in the form
  //check if the useFormContext hook is used inside the form provider

  const formContext = useFormContext()

  if (!formContext) {
    return null
  }
  const { errors } = formContext.formState

  if (!name) {
    return null
  }

  const error = findValueByKey(errors, name)
  if (!error) {
    return null
  }

  return (
    <span data-testid={`error-${id}`} className="mt-0.5 text-body3/regular text-red-500">
      {error?.message ?? ""}
    </span>
  )
}
