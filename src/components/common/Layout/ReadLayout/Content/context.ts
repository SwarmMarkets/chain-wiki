import { createContext, useContext } from "react"

export const ContentRefContext = createContext<{
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
