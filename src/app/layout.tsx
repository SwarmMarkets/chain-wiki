import Layout from 'src/components/common/Layout'
import './globals.css'
import ServicesWrapper from './services-wrapper'
import ToastManager from 'src/components/ui-kit/Toast/ToastManager'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin={'anonymous'} />
        <link
          href='https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap'
          rel='stylesheet'
        />
      </head>
      <body>
        <ServicesWrapper>
          <Layout>{children}</Layout>
        </ServicesWrapper>
        <ToastManager />
        <div id='drawers' />
        <div id='modals' />
        <div id='toasts' />
      </body>
    </html>
  )
}
