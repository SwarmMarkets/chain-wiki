import { create } from 'zustand'
import { TokensQueryFullData } from '../utils'

interface EditingToken {
  id: string
  name: string
  content: string
}

interface EditingState {
  currEditableToken: TokensQueryFullData | null
  editedTokens: EditingToken[]
  editedNft: EditingToken | null

  getEditedTokenById: (id: string) => EditingToken | undefined

  updateOrCreateEditedToken: (token: EditingToken) => void
  updateCurrEditableToken: (id: TokensQueryFullData | null) => void
  updateNft: (nft: EditingToken) => void
}

export const useEditingStore = create<EditingState>((set, get) => ({
  currEditableToken: null,
  editedTokens: [],
  editedNft: null,

  getEditedTokenById: (id: string) => get().editedTokens.find(t => t.id === id),

  updateOrCreateEditedToken: token =>
    set(state => {
      const existingIndex = state.editedTokens.findIndex(t => token.id === t.id)

      if (existingIndex !== -1) {
        const updatedTokens = [...state.editedTokens]
        updatedTokens[existingIndex] = token
        return { editedTokens: updatedTokens }
      }

      return {
        editedTokens: [...state.editedTokens, token],
      }
    }),
  updateNft: nft =>
    set({ editedNft: { id: nft.id, content: nft.content, name: nft.name } }),
  updateCurrEditableToken: (token: TokensQueryFullData | null) =>
    set({ currEditableToken: token }),
}))
