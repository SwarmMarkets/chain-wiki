import { createContext, PropsWithChildren, useContext, useState } from 'react'

const ContentRefContext = createContext<{
  contentElem: HTMLDivElement | null
  setContentElem: React.Dispatch<HTMLDivElement | null>
}>({
  contentElem: null,
  setContentElem: () => {
    return
  },
})
export const useContentRef = () => {
  return useContext(ContentRefContext)
}

const ContentContext: React.FC<PropsWithChildren> = ({ children }) => {
  const [contentElem, setContentElem] = useState<HTMLDivElement | null>(null)

  return (
    <ContentRefContext.Provider value={{ contentElem, setContentElem }}>
      {children}
    </ContentRefContext.Provider>
  )
}

export default ContentContext
