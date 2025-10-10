'use client'

import React, { useEffect, useState, PropsWithChildren } from 'react'
import { I18nextProvider } from 'react-i18next'
import { createInstance, i18n } from 'i18next'
import initTranslations from 'src/config/i18n/i18n'

interface TranslationsProviderProps extends PropsWithChildren {
  locale: string
  namespaces: string[]
  resources?: Record<string, any>
}

export default function TranslationsProvider({
  children,
  locale,
  namespaces,
  resources,
}: TranslationsProviderProps) {
  const [i18nInstance, setI18nInstance] = useState<i18n | null>(null)

  useEffect(() => {
    const instance = createInstance()
    initTranslations(locale, namespaces, instance, resources).then(
      ({ i18n }) => {
        setI18nInstance(i18n)
      }
    )
  }, [locale, namespaces, resources])

  if (!i18nInstance) return null

  return <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>
}
