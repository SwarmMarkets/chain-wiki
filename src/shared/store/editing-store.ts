import { create } from 'zustand'
import { isSameEthereumAddress } from '../utils'

interface EditingContent {
  id: string
  content: string
}

interface EditingState {
  currEditableTokenId: string | null
  tokenContents: EditingContent[]
  nftContent: EditingContent | null

  updateOrCreateTokenContent: (id: string, content: string) => void
  updatecurrEditableTokenId: (id: string | null) => void
}

export const useEditingStore = create<EditingState>(set => ({
  currEditableTokenId: null,
  tokenContents: [],
  nftContent: null,

  updateOrCreateTokenContent: (id: string, content: string) =>
    set(state => {
      const existingIndex = state.tokenContents.findIndex(token =>
        isSameEthereumAddress(token.id, id)
      )

      if (existingIndex !== -1) {
        const updatedTokenContents = [...state.tokenContents]
        updatedTokenContents[existingIndex] = { id, content }
        return { tokenContents: updatedTokenContents }
      }

      return { tokenContents: [...state.tokenContents, { id, content }] }
    }),
  updateNftContent: (id: string, content: string) =>
    set({ nftContent: { id, content } }),
  updatecurrEditableTokenId: (id: string | null) =>
    set({ currEditableTokenId: id }),
}))
