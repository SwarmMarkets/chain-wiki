import { create } from 'zustand'

interface EditingContent {
  id: string
  content: string
}

interface EditingState {
  currEditableTokenId: string | null
  tokenContents: EditingContent[]
  nftContent: EditingContent | null

  updateOrCreateTokenContent: (id: string, content: string) => void
  updateCurrEditableTokenId: (id: string | null) => void
  updateNftContent: (id: string, content: string) => void
}

export const useEditingStore = create<EditingState>(set => ({
  currEditableTokenId: null,
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
  updateCurrEditableTokenId: (id: string | null) =>
    set({ currEditableTokenId: id }),
}))
