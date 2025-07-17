import { ChildrenProp } from 'src/shared/types/common-props'
import React from 'react'
import styled from 'styled-components'
import { useTabContext } from './context'

const TabContent = styled.div`
  padding: 15px 0;
`

interface TabPanelProps extends ChildrenProp {
  value: string
}

const TabPanel: React.FC<TabPanelProps> = ({ value, children }) => {
  const activeValue = useTabContext()

  if (activeValue === null) {
    throw new TypeError('No TabContext provided')
  }

  if (activeValue !== value) {
    return null
  }

  return <TabContent>{children}</TabContent>
}

export default TabPanel
