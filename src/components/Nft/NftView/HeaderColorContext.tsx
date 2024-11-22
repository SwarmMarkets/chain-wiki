import React, { createContext, useContext, useState, useEffect } from 'react'

interface HeaderColorContextType {
  headerColor: string
  setHeaderColor: (color: string) => void
  linksColor: string
  setLinksColor: (color: string) => void
}

const HeaderColorContext = createContext<HeaderColorContextType | undefined>(
  undefined
)

export const HeaderColorProvider: React.FC = ({ children }) => {
  const [headerColor, setHeaderColor] = useState<string>(
    localStorage.getItem('headerColor') || '#FFFFFF'
  )
  const [linksColor, setLinksColor] = useState<string>(
    localStorage.getItem('linksColor') || '#000000'
  )

  useEffect(() => {
    localStorage.setItem('headerColor', headerColor)
    localStorage.setItem('linksColor', linksColor)
  }, [headerColor, linksColor])

  return (
    <HeaderColorContext.Provider
      value={{ headerColor, setHeaderColor, linksColor, setLinksColor }}
    >
      {children}
    </HeaderColorContext.Provider>
  )
}

export const useHeaderColorContext = () => {
  const context = useContext(HeaderColorContext)
  if (!context) {
    throw new Error(
      'useHeaderColorContext must be used within a HeaderColorProvider'
    )
  }
  return context
}
