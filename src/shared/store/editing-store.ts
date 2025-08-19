import { create } from 'zustand'
import { IpfsIndexPage } from '../utils'

export interface EditingToken {
  id: string
  name: string
  slug: string
  content: string
}

export interface EditedIndexPagesState {
  isEdited: boolean
  items: IpfsIndexPage[]
}

interface EditingState {
  currEditableToken: EditingToken | null
  editedTokens: EditingToken[]
  addedTokens: EditingToken[]
  editedIndexPages: EditedIndexPagesState

  getEditedTokenById: (id: string) => EditingToken | undefined
  getAddedTokenById: (id: string) => EditingToken | undefined
  getTokenById: (id: string) => EditingToken | undefined

  updateOrCreateEditedToken: (token: EditingToken) => void
  updateOrCreateAddedToken: (token: EditingToken) => void
  updateCurrEditableToken: (id: EditingToken | null) => void

  initIndexPages: (indexPages: IpfsIndexPage[]) => void
  updateIndexPages: (indexPages: IpfsIndexPage[]) => void
  updateIndexPage: (indexPage: IpfsIndexPage) => void
  addIndexPage: (indexPage: IpfsIndexPage) => void

  resetTokens: () => void
}

export const useEditingStore = create<EditingState>((set, get) => ({
  currEditableToken: null,
  editedTokens: [],
  addedTokens: [],
  editedIndexPages: {
    isEdited: false,
    items: [],
  },

  getEditedTokenById: (id: string) => get().editedTokens.find(t => t.id === id),
  getAddedTokenById: (id: string) => get().addedTokens.find(t => t.id === id),
  getTokenById: (id: string) =>
    get().getAddedTokenById(id) || get().getEditedTokenById(id),

  updateOrCreateEditedToken: token =>
    set(state => {
      const existingIndex = state.editedTokens.findIndex(t => token.id === t.id)

      if (existingIndex !== -1) {
        const editedTokens = [...state.editedTokens]
        editedTokens[existingIndex] = token
        return { editedTokens: editedTokens }
      }

      return {
        editedTokens: [...state.editedTokens, token],
      }
    }),
  updateOrCreateAddedToken: token =>
    set(state => {
      const existingIndex = state.addedTokens.findIndex(t => token.id === t.id)

      if (existingIndex !== -1) {
        const addedTokens = [...state.addedTokens]
        addedTokens[existingIndex] = token
        return { addedTokens }
      }

      return {
        addedTokens: [...state.addedTokens, token],
      }
    }),
  updateCurrEditableToken: (token: EditingToken | null) =>
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
  addIndexPage: (indexPage: IpfsIndexPage) => {
    const indexPages = get().editedIndexPages.items
    set({
      editedIndexPages: { isEdited: true, items: [...indexPages, indexPage] },
    })
  },
  initIndexPages: (indexPages: IpfsIndexPage[]) =>
    set({ editedIndexPages: { isEdited: false, items: indexPages } }),
  resetTokens: () =>
    set({
      editedTokens: [],
      addedTokens: [],
    }),
}))
