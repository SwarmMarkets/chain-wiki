import { ChildrenProp } from '@src/shared/types/common-props'
import React from 'react'

export const Context = React.createContext<string | null>(null)

interface TabContextProps extends ChildrenProp {
  value: string
}

const TabContext: React.FC<TabContextProps> = ({ value, children }) => {
  return <Context.Provider value={value}>{children}</Context.Provider>
}

export default TabContext
