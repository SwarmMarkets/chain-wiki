import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useActiveAccount } from 'thirdweb/react'
import useNFTRoles from 'src/hooks/subgraph/useNFTRoles'
import useSmartAccount from 'src/services/safe-protocol-kit/useSmartAccount'
import { useAddressNameStore } from './addressNameStore'
import { isSameEthereumAddress } from 'src/shared/utils'
import { Roles } from 'src/shared/enums/roles'
import ExplorerLink from '../../common/ExplorerLink'
import GrantRoleForm from './GrantRoleForm'
import RevokeRoleButton from './RevokeRoleButton'
import Table from 'src/components/ui-kit/Table'

interface NftRoleManagerProps {
  nftAddress: string
}

const NftRoleManager: React.FC<NftRoleManagerProps> = ({ nftAddress }) => {
  const { t } = useTranslation('nft', { keyPrefix: 'settings.roleManager' })
  const { nft } = useNFTRoles(nftAddress)
  const { smartAccountInfo } = useSmartAccount()
  const { addressNames } = useAddressNameStore()
  const currentAccount = useActiveAccount()
  const currentAddress = currentAccount?.address

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
      <Table.Root>
        <Table.Header>
          <Table.HeaderRow>
            <Table.HeadCell>{t('tableHead.address')}</Table.HeadCell>
            <Table.HeadCell>{t('tableHead.role')}</Table.HeadCell>
            <Table.HeadCell></Table.HeadCell>
          </Table.HeaderRow>
        </Table.Header>
        <Table.Body>
          {users.map(user => (
            <Table.Row key={`${user.address}-${user.role}`}>
              <Table.Cell>
                <ExplorerLink type='address' hash={user.address}>
                  <div className='font-semibold'>{user.displayName}</div>
                  {user.displayName !== user.address && (
                    <div className='text-sm'>{user.address}</div>
                  )}
                </ExplorerLink>
              </Table.Cell>
              <Table.Cell>{user.role}</Table.Cell>
              <Table.Cell>
                <RevokeRoleButton
                  from={user.address}
                  role={user.roleType}
                  nftAddress={nftAddress}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <div className='mt-4'>
        <GrantRoleForm nftAddress={nftAddress} />
      </div>
    </>
  )
}

export default NftRoleManager
