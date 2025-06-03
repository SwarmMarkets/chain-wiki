import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ExtendedRoles, Roles } from 'src/shared/enums/roles'



type AddressNameStore = {
  addressNames: Record<string, string>
  setAddressName: (
    address: string,
    role: Roles | ExtendedRoles,
    name: string
  ) => void
}

export const useAddressNameStore = create<AddressNameStore>()(
  persist(
    set => ({
      addressNames: {},
      setAddressName: (address, role, name) =>
        set(state => ({
          addressNames: {
            ...state.addressNames,
            [`${address.toLowerCase()}-${role}`]: name,
          },
        })),
    }),
    {
      name: 'address-name-store',
    }
  )
)
