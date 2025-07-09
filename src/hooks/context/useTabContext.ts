import { Context } from 'src/components/ui-kit/Tabs/TabContext'
import React from 'react'

export function useTabContext() {
  return React.useContext(Context)
}
