import React, { ReactNode } from "react"
import { FormattedMessage as ReactFormattedMessage, useIntl } from "react-intl"
import { IntlMessageID } from "./I18nProvider"

type FormattedMessageProps = {
  id?: IntlMessageID
  defaultMessage?: string
  values?: Record<string, React.ReactNode>
  children?: (nodes: ReactNode[]) => any
}

export function FormattedMessage({ id, defaultMessage, values, children }: FormattedMessageProps) {
  return <ReactFormattedMessage id={id} values={values} defaultMessage={defaultMessage} children={children} />
}

export function useFormattedMessage() {
  const { formatMessage } = useIntl()
  return {
    formatMessage: ({
      id,
      defaultMessage,
      values,
      description,
    }: {
      id: IntlMessageID
      values?: Record<string, React.ReactNode>
      defaultMessage?: string
      description?: string
    }) => formatMessage({ id, defaultMessage, description }, values) as string,
  }
}
