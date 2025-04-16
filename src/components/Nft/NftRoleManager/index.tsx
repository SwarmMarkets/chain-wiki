import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import useNFTRoles from 'src/hooks/subgraph/useNFTRoles'
import { Roles } from 'src/shared/enums/roles'
import ExplorerLink from '../../common/ExplorerLink'
import GrantRoleForm from './GrantRoleForm'
import RevokeRoleButton from './RevokeRoleButton'
import useSmartAccount from 'src/services/safe-protocol-kit/useSmartAccount'
import { isSameEthereumAddress } from 'src/shared/utils'
import { useAddress } from '@thirdweb-dev/react'
import { useAddressNameStore } from './addressNameStore'

interface NftRoleManagerProps {
  nftAddress: string
}

const NftRoleManager: React.FC<NftRoleManagerProps> = ({ nftAddress }) => {
  const { nft } = useNFTRoles(nftAddress)
  const { t } = useTranslation('nft')
  const { smartAccountInfo } = useSmartAccount()
  const { addressNames } = useAddressNameStore()
  const currentAddress = useAddress()

  const users = useMemo(() => {
    if (!nft || !smartAccountInfo) return []

    const admins = nft.admins.map(admin => ({
      address: admin,
      role: t('roles.admin'),
      roleType: Roles.ADMIN,
    }))

    const editors = nft.editors.map(editor => ({
      address: editor,
      role: t('roles.editor'),
      roleType: Roles.EDITOR,
    }))

    const allUsers = [...editors, ...admins]

    return allUsers.map(user => {
      const isCurrentUser =
        currentAddress && isSameEthereumAddress(user.address, currentAddress)

      const displayName = isCurrentUser
        ? t('you')
        : addressNames[user.address] || user.address

      return {
        ...user,
        displayName,
      }
    })
  }, [nft, smartAccountInfo, t, addressNames, currentAddress])

  const usersWithoutSmartAccount = useMemo(() => {
    if (!smartAccountInfo) return users
    return users.filter(
      user => !isSameEthereumAddress(user.address, smartAccountInfo?.address)
    )
  }, [users, smartAccountInfo])

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
          {usersWithoutSmartAccount.map(user => (
            <tr
              key={user.address + user.role}
              className='hover:bg-blue-50 border-b border-main'
            >
              <td className='p-3'>
                <ExplorerLink type='address' hash={user.address}>
                  {user.displayName}
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
