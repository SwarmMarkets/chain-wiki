import { PropsWithChildren } from 'react'
import ToastManager from 'src/components/ui-kit/Toast/ToastManager'
import ServicesWrapper from './services-wrapper'

import './globals.css'
import TranslationsProvider from 'src/components/TranslationProvider'
import i18nConfig from 'src/config/i18n/i18nConfig'
import initTranslations from 'src/config/i18n/i18n'

const RootLayout: React.FC<PropsWithChildren> = async ({ children }) => {
  const { resources } = await initTranslations('en', i18nConfig.namespaces)

  return (
    <html lang='en'>
      <head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin={'anonymous'}
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap'
          rel='stylesheet'
        />
      </head>
      <body>
        <ServicesWrapper>
          <TranslationsProvider
            locale={'en'}
            namespaces={i18nConfig.namespaces}
            resources={resources}
          >
            {children}
          </TranslationsProvider>
        </ServicesWrapper>
        <ToastManager />
        <div id='drawers' />
        <div id='modals' />
        <div id='toasts' />
      </body>
    </html>
  )
}

export default RootLayout
