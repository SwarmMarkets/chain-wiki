/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactElement } from 'react'
import styled from 'styled-components'
import { Tab as ITab } from '@src/shared/types/ui-components'
import { ChildrenProp } from '@src/shared/types/common-props'
import { TabProps } from './Tab'

interface TabsProps<T extends ITab> extends ChildrenProp {
  onChange: (tab: T) => void
}

const TabsWrapper = styled.div`
  display: flex;
  justify-content: end;
  border-bottom: 1px solid ${({ theme }) => theme.palette.borderPrimary};
`

const Tabs = <T extends ITab>({
  onChange,
  children: childrenProp,
}: TabsProps<T>) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleTabClick = (tab: T) => {
    onChange && onChange(tab)
  }

  const children = React.Children.map(childrenProp, child => {
    if (!React.isValidElement(child)) {
      return null
    }

    return React.cloneElement(child as ReactElement<TabProps>, {
      onChange() {
        handleTabClick(child.props)
      },
    })
  })

  return <TabsWrapper>{children}</TabsWrapper>
}

export default Tabs
