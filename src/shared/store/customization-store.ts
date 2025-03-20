import { create } from 'zustand'
import { IpfsHeaderLink } from '../utils'

interface CustomizationState {
  headerBackground: string
  linksColor: string
  headerLinks: IpfsHeaderLink[]
  logoUrl: string
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

  setHeaderBackground: (background: string) =>
    set({ headerBackground: background }),
  setLinksColor: color => set({ linksColor: color }),
  setHeaderLinks: links => set({ headerLinks: links }),
  setLogoUrl: url => set({ logoUrl: url }),
  init: state => set(state),
  reset: () =>
    set({
      headerBackground: '#0179ef',
      linksColor: '#ffffff',
      logoUrl: '',
      headerLinks: [],
    }),
}))
