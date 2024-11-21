import React, { createContext, useContext, useState } from 'react'

const HeaderColorContext = createContext<{
  headerColor: string
  setHeaderColor: (color: string) => void
  linksColor: string
  setLinksColor: (color: string) => void
}>({
  headerColor: '',
  setHeaderColor: () => {},
  linksColor: '',
  setLinksColor: () => {},
})

export const HeaderColorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [headerColor, setHeaderColor] = useState<string>('')
  const [linksColor, setLinksColor] = useState<string>('')

  return (
    <HeaderColorContext.Provider
      value={{
        headerColor,
        setHeaderColor,
        linksColor,
        setLinksColor,
      }}
    >
      {children}
    </HeaderColorContext.Provider>
  )
}

export const useHeaderColorContext = () => useContext(HeaderColorContext)
