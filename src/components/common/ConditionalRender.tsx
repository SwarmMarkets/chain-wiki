import clsx from 'clsx'
import { AnimatePresence } from 'framer-motion'
import React, { HTMLAttributes, Key, ReactNode } from 'react'
import Opacity from '../ui-kit/Animations/Opacity'

interface ConditionalRenderProps<T> extends HTMLAttributes<HTMLDivElement> {
  value: T
  children: ReactNode
}

interface ConditionalItemProps<T> {
  case: T
  children: ReactNode
  className?: string
}

export const ConditionalRender = <T,>({
  value,
  children,
  className,
  ...props
}: ConditionalRenderProps<T>) => (
  <div className={clsx(className, 'w-full')} {...props}>
    <AnimatePresence mode='wait'>
      {React.Children.toArray(children).find(
        child =>
          (child as React.ReactElement<ConditionalItemProps<T>>).props.case ===
          value
      )}
    </AnimatePresence>
  </div>
)

export const ConditionalItem = <T,>({
  case: caseValue,
  children,
  className,
}: ConditionalItemProps<T>) => (
  <Opacity duration={0.1} className={className} key={caseValue as Key}>
    {children}
  </Opacity>
)
