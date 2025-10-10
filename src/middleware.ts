import { NextRequest } from 'next/server'
import { i18nRouter } from 'next-i18n-router'
import i18nConfig from './config/i18n/i18nConfig'

export function middleware(request: NextRequest) {
  return i18nRouter(request, i18nConfig)
}

// Применяется только к страницам в app-директории (не к API, static и _next)
export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)',
}
