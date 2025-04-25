import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useAddress } from '@thirdweb-dev/react'
import useNFTRoles from 'src/hooks/subgraph/useNFTRoles'
import useSmartAccount from 'src/services/safe-protocol-kit/useSmartAccount'
import { useAddressNameStore } from './addressNameStore'
import { isSameEthereumAddress } from 'src/shared/utils'
import { Roles } from 'src/shared/enums/roles'
import ExplorerLink from '../../common/ExplorerLink'
import GrantRoleForm from './GrantRoleForm'
import RevokeRoleButton from './RevokeRoleButton'

interface NftRoleManagerProps {
  nftAddress: string
}

const NftRoleManager: React.FC<NftRoleManagerProps> = ({ nftAddress }) => {
  const { t } = useTranslation('nft')
  const { nft } = useNFTRoles(nftAddress)
  const { smartAccountInfo } = useSmartAccount()
  const { addressNames } = useAddressNameStore()
  const currentAddress = useAddress()

  const formatUser = useCallback(
    (address: string, role: string, roleType: Roles) => {
      const isCurrent =
        currentAddress && isSameEthereumAddress(address, currentAddress)
      const key = `${address.toLowerCase()}-${roleType}`
      const displayName = isCurrent
        ? t('messages.you')
        : addressNames[key] || address

      return { address, role, roleType, displayName }
    },
    [addressNames, currentAddress, t]
  )

  const users = useMemo(() => {
    if (!nft) return []

    const admins = nft.admins.map(addr =>
      formatUser(addr, t('roles.admin'), Roles.ADMIN)
    )
    const editors = nft.editors.map(addr =>
      formatUser(addr, t('roles.editor'), Roles.EDITOR)
    )

    return [...editors, ...admins].filter(
      user => !isSameEthereumAddress(user.address, smartAccountInfo?.address)
    )
  }, [nft, formatUser, t, smartAccountInfo?.address])

  return (
    <>
      <table className='w-full overflow-hidden'>
        <thead className='border-b border-main'>
          <tr>
            <th className='p-3 text-left font-semibold'>
              {t('roleManager.tableHead.address')}
            </th>
            <th className='p-3 text-left font-semibold'>
              {t('roleManager.tableHead.role')}
            </th>
            <th className='p-3 text-left'></th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr
              key={`${user.address}-${user.role}`}
              className='hover:bg-primary-muted border-b border-main'
            >
              <td className='p-3'>
                <ExplorerLink type='address' hash={user.address}>
                  <div className='font-semibold'>{user.displayName}</div>
                  {user.displayName !== user.address && (
                    <div className='text-sm'>{user.address}</div>
                  )}
                </ExplorerLink>
              </td>
              <td className='p-3'>{user.role}</td>
              <td className='p-3'>
                <RevokeRoleButton
                  from={user.address}
                  role={user.roleType}
                  nftAddress={nftAddress}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='mt-4'>
        <GrantRoleForm nftAddress={nftAddress} />
      </div>
    </>
  )
}

export default NftRoleManager
