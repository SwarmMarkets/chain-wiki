import React, { ReactElement } from 'react'
import styled from 'styled-components'
import { Tab as ITab } from '@src/shared/types/ui-components'
import { ChildrenProp } from '@src/shared/types/common-props'
import { TabProps } from './Tab'
import { NftTabs } from '@src/shared/enums/tabs'

interface TabsProps extends ChildrenProp {
  onChange: (tab: ITab<NftTabs>) => void
}

const TabsWrapper = styled.div`
  display: flex;
  justify-content: end;
  border-bottom: 1px solid ${({ theme }) => theme.palette.borderPrimary};
`

const Tabs: React.FC<TabsProps> = ({ onChange, children: childrenProp }) => {
  const handleTabClick = (tab: ITab<NftTabs>) => {
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
