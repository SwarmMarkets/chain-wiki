import { ChildrenProp } from 'src/shared/types/common-props'
import React, { HtmlHTMLAttributes } from 'react'
import { LayoutProps, SpaceProps } from 'styled-system'
import { ErrorText, SelectWrapper, StyledSelect } from './styled-components'

interface SelectProps extends SpaceProps, LayoutProps, ChildrenProp {
  error?: string
  inputProps: HtmlHTMLAttributes<HTMLSelectElement>
}

export const Select: React.FC<SelectProps> = ({
  error,
  children,
  inputProps,
  ...props
}) => {
  return (
    <SelectWrapper {...props}>
      <StyledSelect error={error} {...inputProps}>
        {children}
      </StyledSelect>
      {error ? <ErrorText>{error}</ErrorText> : null}
    </SelectWrapper>
  )
}
