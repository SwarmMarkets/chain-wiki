import { Context } from '@src/components/ui/Tabs/TabContext'
import React from 'react'

export function useTabContext() {
  return React.useContext(Context)
}
