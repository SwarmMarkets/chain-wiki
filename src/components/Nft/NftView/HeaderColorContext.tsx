import React, { createContext, useContext, useState } from 'react'

const HeaderColorContext = createContext<{
  headerColor: string
  setHeaderColor: (color: string) => void
  nftId: string
  setNftId: (id: string) => void
}>({
  headerColor: '',
  setHeaderColor: () => {},
  nftId: '',
  setNftId: () => {},
})

export const HeaderColorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [headerColor, setHeaderColor] = useState<string>('')
  const [nftId, setNftId] = useState<string>('')

  return (
    <HeaderColorContext.Provider
      value={{ headerColor, setHeaderColor, nftId, setNftId }}
    >
      {children}
    </HeaderColorContext.Provider>
  )
}

export const useHeaderColorContext = () => useContext(HeaderColorContext)
