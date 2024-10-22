import {
  IpfsIndexPage,
  TokensQueryFullData,
} from '@src/shared/utils/ipfs/types'
import { useState } from 'react'
import { DropResult } from 'react-beautiful-dnd'

interface InitialState {
  tokens: TokensQueryFullData[]
  indexPages: IpfsIndexPage[]
}

const useDroppableEditList = ({ indexPages, tokens }: InitialState) => {
  const [activeIndexPages, setActiveIndexPages] =
    useState<IpfsIndexPage[]>(indexPages)
  const [disabledIndexPages, setDisabledIndexPages] = useState<IpfsIndexPage[]>(
    tokens
      .map(token => ({ tokenId: token.id, title: token.name }))
      .filter(
        page =>
          !indexPages.find(indexPage => indexPage.tokenId === page.tokenId)
      )
  )

  const dragAndDrop = (result: DropResult) => {
    const { source, destination } = result

    if (!destination) {
      return
    }

    const isSameList = source.droppableId === destination.droppableId

    if (isSameList) {
      if (source.droppableId === 'activeIndexPages') {
        const reorderedPages = Array.from(activeIndexPages)
        const [moved] = reorderedPages.splice(source.index, 1)
        reorderedPages.splice(destination.index, 0, moved)
        setActiveIndexPages(reorderedPages)
        return { activeIndexPages: reorderedPages, disabledIndexPages }
      } else if (source.droppableId === 'disabledIndexPages') {
        const reorderedPages = Array.from(disabledIndexPages)
        const [moved] = reorderedPages.splice(source.index, 1)
        reorderedPages.splice(destination.index, 0, moved)
        setDisabledIndexPages(reorderedPages)
        return { activeIndexPages, disabledIndexPages: reorderedPages }
      }
    } else {
      if (source.droppableId === 'activeIndexPages') {
        const activeCopy = Array.from(activeIndexPages)
        const disabledCopy = Array.from(disabledIndexPages)
        const [moved] = activeCopy.splice(source.index, 1)
        disabledCopy.splice(destination.index, 0, moved)
        setActiveIndexPages(activeCopy)
        setDisabledIndexPages(disabledCopy)
        return {
          activeIndexPages: activeCopy,
          disabledIndexPages: disabledCopy,
        }
      } else if (source.droppableId === 'disabledIndexPages') {
        const disabledCopy = Array.from(disabledIndexPages)
        const activeCopy = Array.from(activeIndexPages)
        const [moved] = disabledCopy.splice(source.index, 1)
        activeCopy.splice(destination.index, 0, moved)
        setDisabledIndexPages(disabledCopy)
        setActiveIndexPages(activeCopy)
        return {
          activeIndexPages: activeCopy,
          disabledIndexPages: disabledCopy,
        }
      }
    }
  }

  return {
    activeIndexPages,
    disabledIndexPages,
    dragAndDrop,
  }
}

export default useDroppableEditList
