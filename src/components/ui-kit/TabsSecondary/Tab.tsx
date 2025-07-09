import clsx from 'clsx'
import React from 'react'
import { NavLink, NavLinkProps } from 'react-router-dom'

export interface TabProps extends NavLinkProps {
  label: string
}

const Tab: React.FC<TabProps> = ({ label, className, ...props }) => {
  const baseClasses = clsx(
    'text-main text-center typo-label2 py-1 px-3 rounded-3xl box-border',
    'border',
    'hover:text-main-accent hover:border-main-hover focus:border-main-active transition-all',
    className
  )

  const activeClasses = clsx('text-main-accent border-main-active bg-paper')

  return (
    <NavLink
      className={({ isActive }) =>
        `${baseClasses} ${isActive ? activeClasses : 'border-transparent'}`
      }
      {...props}
    >
      {label}
    </NavLink>
  )
}

export default Tab
