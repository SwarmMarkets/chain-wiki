import { create } from 'zustand'
import { IpfsIndexPage, TokensQueryFullData } from '../utils'

interface EditingToken {
  id: string
  name: string
  content: string
}

interface EditedIndexPagesState {
  isEdited: boolean
  items: IpfsIndexPage[]
}

interface EditingState {
  currEditableToken: TokensQueryFullData | null
  editedTokens: EditingToken[]
  editedNft: EditingToken | null
  editedIndexPages: EditedIndexPagesState

  getEditedTokenById: (id: string) => EditingToken | undefined

  updateOrCreateEditedToken: (token: EditingToken) => void
  updateCurrEditableToken: (id: TokensQueryFullData | null) => void
  updateNft: (nft: EditingToken) => void

  initIndexPages: (indexPages: IpfsIndexPage[]) => void
  updateIndexPages: (indexPages: IpfsIndexPage[]) => void
  updateIndexPage: (indexPage: IpfsIndexPage) => void
}

export const useEditingStore = create<EditingState>((set, get) => ({
  currEditableToken: null,
  editedTokens: [],
  editedNft: null,
  editedIndexPages: {
    isEdited: false,
    items: [],
  },

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
  updateIndexPages: (indexPages: IpfsIndexPage[]) =>
    set({ editedIndexPages: { isEdited: true, items: indexPages } }),
  updateIndexPage: (indexPage: IpfsIndexPage) => {
    const indexPages = get().editedIndexPages.items
    const indexPageIndex = indexPages.findIndex(
      ip => ip.tokenId === indexPage.tokenId
    )
    if (indexPageIndex !== -1) {
      const updatedIndexPages = [...indexPages]
      updatedIndexPages[indexPageIndex] = indexPage
      set({ editedIndexPages: { isEdited: true, items: updatedIndexPages } })
    }
  },
  initIndexPages: (indexPages: IpfsIndexPage[]) =>
    set({ editedIndexPages: { isEdited: false, items: indexPages } }),
}))
