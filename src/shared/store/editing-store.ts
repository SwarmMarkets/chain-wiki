import { create } from 'zustand'

interface TokenEditingContent {
  id: string
  content: string
}

interface EditingState {
  tokenContents: TokenEditingContent[]
}

export const useEditingStore = create<EditingState>(set => ({
  tokenContents: [],

  addTokenContent: (id: string, content: string) =>
    set(state => ({
      tokenContents: [...state.tokenContents, { id, content }],
    })),
}))
