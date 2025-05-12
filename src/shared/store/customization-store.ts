import { create } from 'zustand'
import { IpfsHeaderLink } from '../utils'

interface CustomizationState {
  headerBackground: string
  linksColor: string
  headerLinks: IpfsHeaderLink[]
  logoUrl: string
  iconLogoUrl?: string
  isEdited?: boolean
}

interface CustomizationSetters {
  setHeaderBackground: (background: string) => void
  setLinksColor: (color: string) => void
  setHeaderLinks: (links: IpfsHeaderLink[]) => void
  setLogoUrl: (url: string) => void
  setIconLogoUrl: (url: string) => void
  init: (state: Partial<CustomizationState>) => void
  reset: () => void
}

type CustomizationStore = CustomizationState & CustomizationSetters

export const useCustomizationStore = create<CustomizationStore>(set => ({
  headerBackground: '#511DD7',
  linksColor: '#ffffff',
  headerLinks: [],
  logoUrl: '',
  iconLogoUrl: '',
  isEdited: false,

  setHeaderBackground: (background: string) =>
    set({ headerBackground: background, isEdited: true }),
  setLinksColor: color => set({ linksColor: color, isEdited: true }),
  setHeaderLinks: links => set({ headerLinks: links, isEdited: true }),
  setLogoUrl: url => set({ logoUrl: url, isEdited: true }),
  setIconLogoUrl: url => set({ iconLogoUrl: url, isEdited: true }),
  init: state => set(state),
  reset: () =>
    set({
      headerBackground: '#511DD7',
      linksColor: '#ffffff',
      logoUrl: '',
      iconLogoUrl: '',
      headerLinks: [],
    }),
}))
