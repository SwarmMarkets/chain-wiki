'use client'

import Link, { LinkProps } from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { PropsWithChildren } from 'react'

interface LinkPreserveSearchProps extends PropsWithChildren, LinkProps {
  className: string
}

const LinkPreserveSearch: React.FC<LinkPreserveSearchProps> = ({
  href,
  children,
  ...props
}) => {
  const searchParams = useSearchParams()
  const search = searchParams?.toString() ? `?${searchParams.toString()}` : ''

  return (
    <Link href={href + search} {...props}>
      {children}
    </Link>
  )
}

export default LinkPreserveSearch
