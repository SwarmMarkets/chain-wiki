import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const res = NextResponse.next()

  res.headers.set('x-pathname', req.nextUrl.pathname)
  res.headers.set('x-search', req.nextUrl.search)

  return res
}

export const config = {
  matcher: [
    '/((?!_next|api|favicon.ico).*)',
  ],
}
