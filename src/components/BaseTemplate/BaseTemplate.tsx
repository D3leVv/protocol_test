export type BaseTemplateProps = {
  simpleText: string
  dataTestId: string
}

export const BaseTemplate = ({ simpleText, dataTestId }: BaseTemplateProps) => {
  return <div data-testId={dataTestId}>{simpleText}</div>
}
