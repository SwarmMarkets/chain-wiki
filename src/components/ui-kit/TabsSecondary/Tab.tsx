'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export interface TabProps {
  label: string
  href: string
  className?: string
  exact?: boolean // если нужно проверять точное совпадение пути
}

const Tab: React.FC<TabProps> = ({ label, href, className, exact = false }) => {
  const pathname = usePathname()

  const isActive = exact ? pathname === href : pathname.startsWith(href)

  const baseClasses = clsx(
    'text-main text-center typo-label2 py-1 px-3 rounded-3xl box-border',
    'border',
    'hover:text-main-accent hover:border-main-hover focus:border-main-active transition-all',
    className
  )

  const activeClasses = clsx('text-main-accent border-main-active bg-paper')

  return (
    <Link
      href={href}
      className={`${baseClasses} ${
        isActive ? activeClasses : 'border-transparent'
      }`}
    >
      {label}
    </Link>
  )
}

export default Tab
