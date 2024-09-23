import React, { createContext, useContext, useState } from 'react'

const HeaderColorContext = createContext<{
  headerColor: string
  setHeaderColor: (color: string) => void
}>({
  headerColor: '',
  setHeaderColor: () => {},
})

export const HeaderColorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [headerColor, setHeaderColor] = useState<string>('')

  return (
    <HeaderColorContext.Provider value={{ headerColor, setHeaderColor }}>
      {children}
    </HeaderColorContext.Provider>
  )
}

export const useHeaderColorContext = () => useContext(HeaderColorContext)
