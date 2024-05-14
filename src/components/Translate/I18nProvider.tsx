import { ReactNode } from "react"
import { IntlProvider } from "react-intl"
import deMessages from "../../locale/de.json"
import enMessages from "../../locale/en.json"

const messages = {
  en: enMessages,
  de: deMessages,
}

// get browser language without the region code
const language = navigator.language.split(/[-_]/)[0]

export type IntlMessageID = keyof typeof enMessages

export default function I18nProvider({ children, locale }: { children: ReactNode; locale?: string }) {
  console.log("language", navigator.language)
  return (
    <IntlProvider
      locale={locale || navigator.language}
      messages={messages[(locale as keyof typeof messages) || (language as keyof typeof messages)]}
    >
      {children}
    </IntlProvider>
  )
}
