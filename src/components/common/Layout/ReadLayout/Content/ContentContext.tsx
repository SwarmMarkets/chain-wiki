import { PropsWithChildren, useState } from 'react'
import { ContentRefContext } from './context'

const ContentContext: React.FC<PropsWithChildren> = ({ children }) => {
  const [contentElem, setContentElem] = useState<HTMLDivElement | null>(null)

  return (
    <ContentRefContext.Provider value={{ contentElem, setContentElem }}>
      {children}
    </ContentRefContext.Provider>
  )
}

export default ContentContext
