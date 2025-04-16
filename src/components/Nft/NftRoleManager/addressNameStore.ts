import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface AddressNameMap {
  [address: string]: string
}

interface AddressNameStore {
  addressNames: AddressNameMap
  setAddressName: (address: string, name: string) => void
}

export const useAddressNameStore = create<AddressNameStore>()(
  persist(
    set => ({
      addressNames: {},
      setAddressName: (address, name) =>
        set(state => ({
          addressNames: { ...state.addressNames, [address]: name },
        })),
    }),
    {
      name: 'addressNames',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
