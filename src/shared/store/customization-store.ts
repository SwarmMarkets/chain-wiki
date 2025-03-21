import { create } from 'zustand'
import { IpfsHeaderLink } from '../utils'

interface CustomizationState {
  headerBackground: string
  linksColor: string
  headerLinks: IpfsHeaderLink[]
  logoUrl: string
  isEdited?: boolean
}

interface CustomizationSetters {
  setHeaderBackground: (background: string) => void
  setLinksColor: (color: string) => void
  setHeaderLinks: (links: IpfsHeaderLink[]) => void
  setLogoUrl: (url: string) => void
  init: (state: Partial<CustomizationState>) => void
  reset: () => void
}

type CustomizationStore = CustomizationState & CustomizationSetters

export const useCustomizationStore = create<CustomizationStore>(set => ({
  headerBackground: '#0179ef',
  linksColor: '#ffffff',
  headerLinks: [],
  logoUrl: '',
  isEdited: false,

  setHeaderBackground: (background: string) =>
    set({ headerBackground: background, isEdited: true }),
  setLinksColor: color => set({ linksColor: color, isEdited: true }),
  setHeaderLinks: links => set({ headerLinks: links, isEdited: true }),
  setLogoUrl: url => set({ logoUrl: url, isEdited: true }),
  init: state => set(state),
  reset: () =>
    set({
      headerBackground: '#0179ef',
      linksColor: '#ffffff',
      logoUrl: '',
      headerLinks: [],
    }),
}))
