import { ChildrenProp } from 'src/shared/types/common-props'
import React from 'react'
import { Context } from './context'

interface TabContextProps extends ChildrenProp {
  value: string | null
}

const TabContext: React.FC<TabContextProps> = ({ value, children }) => {
  return <Context.Provider value={value}>{children}</Context.Provider>
}

export default TabContext
