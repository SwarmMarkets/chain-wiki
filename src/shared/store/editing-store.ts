import { create } from 'zustand'
import { TokensQueryFullData } from '../utils'

interface EditingContent {
  id: string
  name: string
  content: string
}

interface EditingState {
  currEditableToken: TokensQueryFullData | null
  editedTokens: EditingContent[]
  editedNft: EditingContent | null

  updateOrCreateEditedTokenContent: (id: string, content: string) => void
  updateCurrEditableToken: (id: TokensQueryFullData | null) => void
  updateNftContent: (id: string, content: string) => void
}

export const useEditingStore = create<EditingState>(set => ({
  currEditableToken: null,
  editedTokens: [],
  editedNft: null,

  updateOrCreateEditedTokenContent: (id: string, content: string) =>
    set(state => {
      const existingIndex = state.editedTokens.findIndex(
        token => token.id === id
      )

      if (existingIndex !== -1) {
        const updatedTokens = [...state.editedTokens]
        updatedTokens[existingIndex] = {
          ...updatedTokens[existingIndex],
          id,
          content,
        }
        return { editedTokens: updatedTokens }
      }

      return {
        editedTokens: [...state.editedTokens, { id, content, name: '' }],
      }
    }),
  updateNftContent: (id: string, content: string) =>
    set(state => ({
      editedNft: { id, content, name: state.editedNft?.name || '' },
    })),
  updateCurrEditableToken: (token: TokensQueryFullData | null) =>
    set({ currEditableToken: token }),
}))
