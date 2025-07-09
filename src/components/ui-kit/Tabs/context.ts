import React from 'react'

export const Context = React.createContext<string | null>(null)

export function useTabContext() {
  return React.useContext(Context)
}
