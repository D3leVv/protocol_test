interface Props {
  errorMessage?: string
  id?: string
}

export const CustomErrorMessage = ({ errorMessage, id }: Props) =>
  errorMessage ? (
    <span data-testid={`error-${id}`} className="text-body3/regular text-red-500">
      {errorMessage}
    </span>
  ) : null
