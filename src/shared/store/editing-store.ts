import { create } from 'zustand'
import { TokensQueryFullData } from '../utils'

interface EditingContent {
  id: string
  content: string
}

interface EditingState {
  currEditableToken: TokensQueryFullData | null
  tokenContents: EditingContent[]
  nftContent: EditingContent | null

  updateOrCreateTokenContent: (id: string, content: string) => void
  updateCurrEditableToken: (id: TokensQueryFullData | null) => void
  updateNftContent: (id: string, content: string) => void
}

export const useEditingStore = create<EditingState>(set => ({
  currEditableToken: null,
  tokenContents: [],
  nftContent: null,

  updateOrCreateTokenContent: (id: string, content: string) =>
    set(state => {
      const existingIndex = state.tokenContents.findIndex(
        token => token.id === id
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
  updateCurrEditableToken: (token: TokensQueryFullData | null) =>
    set({ currEditableToken: token }),
}))
