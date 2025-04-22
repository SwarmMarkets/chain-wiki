import React from 'react'

type DynamicComponentProps<T extends React.ElementType> = {
  as?: T
  className?: string
} & React.ComponentPropsWithoutRef<T>

const DynamicComponent = <T extends React.ElementType = 'div'>({
  as,
  children,
  ...props
}: DynamicComponentProps<T>) => {
  const Component = as || 'div'
  return <Component {...props}>{children}</Component>
}

export default DynamicComponent
