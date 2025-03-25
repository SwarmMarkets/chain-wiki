import React, { createContext, useContext } from 'react'

interface InfiniteListContextProps {
  hasMore: boolean
  loading: boolean
  loadMore: () => void
}

const InfiniteListContext = createContext<InfiniteListContextProps>({
  hasMore: false,
  loading: false,
  loadMore: () => undefined,
})

export const useInfiniteListContext = () => {
  const context = useContext(InfiniteListContext)
  if (!context) {
    throw new Error(
      'useInfiniteListContext must be used within an InfiniteListProvider'
    )
  }
  return context
}

interface InfiniteListProviderProps {
  hasMore: boolean
  loading: boolean
  loadMore: () => void
  children: React.ReactNode
}

const InfiniteListProvider: React.FC<InfiniteListProviderProps> = ({
  hasMore,
  loading,
  loadMore,
  children,
}) => {
  return (
    <InfiniteListContext.Provider value={{ hasMore, loading, loadMore }}>
      {children}
    </InfiniteListContext.Provider>
  )
}

export default InfiniteListProvider
