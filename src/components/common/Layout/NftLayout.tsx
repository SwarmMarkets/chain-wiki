import { generatePath, Link, Outlet, useParams } from 'react-router-dom'
import IndexPages from 'src/components/IndexPages'
import useNFT from 'src/hooks/subgraph/useNFT'
import useTokens from 'src/hooks/subgraph/useTokens'
import { getExplorerUrl, unifyAddressToId } from 'src/shared/utils'
import SwitchNetworkAlert from '../SwitchNetworkAlert'
import Icon from 'src/components/ui-kit/Icon/Icon'
import { t } from 'i18next'
import RoutePaths from 'src/shared/enums/routes-paths'
import { useChainId } from '@thirdweb-dev/react'
import IconButton from 'src/components/ui-kit/IconButton'
import Button from 'src/components/ui-kit/Button/Button'
import useNftPermissions from 'src/hooks/permissions/useNftPermissions'
import useNFTRoleManager from 'src/components/Nft/NftRoleManager/useNFTRoleManager'
import useEdit from 'src/components/Edit/useEdit'
import useSmartAccount from 'src/services/safe-protocol-kit/useSmartAccount'
import { Roles } from 'src/shared/enums'

const NftLayout = () => {
  const { nftId = '', tokenId = '' } = useParams()

  const { nft } = useNFT(nftId, { fetchFullData: true })

  const { smartAccountInfo } = useSmartAccount()

  const chainId = useChainId()

  const { smartAccountPermissions, loading: isNftPermissionsLoading } =
    useNftPermissions(nftId)

  const { grantRole, txLoading } = useNFTRoleManager(nftId)

  const { merge, mergeLoading } = useEdit()

  const isEditMode = window.location.pathname.includes('edit')

  const {
    fullTokens,
    loading: fullTokensLoading,
    refetching: refetchingFullTokens,
  } = useTokens(
    {
      variables: { filter: { nft: unifyAddressToId(nftId) }, limit: 100 },
    },
    { fetchFullData: true }
  )
  const handleIconClick = () => {
    const explorerUrl = getExplorerUrl({
      type: 'address',
      chainId,
      hash: nftId,
    })
    window.open(explorerUrl, '_blank')
  }

  const grantRoleForSmartAccount = async () => {
    if (smartAccountInfo?.address) {
      grantRole(smartAccountInfo?.address, Roles.EDITOR)
    }
  }

  return (
    <div className='flex flex-col h-screen'>
      <header className='bg-paper px-4 py-2 border-b border-gray-200 flex justify-between items-center'>
        <div className='flex items-center gap-2.5'>
          <h1 className='typo-title2 text-main-accent'>{nft?.name}</h1>
          <IconButton onClick={handleIconClick}>
            <Icon name='externalLink' size={10} />
          </IconButton>
        </div>

        <Link to={generatePath(RoutePaths.EDIT, { nftId })}>
          {isEditMode ? (
            !smartAccountPermissions.canUpdateContent ? (
              <Button
                className='px-8'
                loading={txLoading}
                onClick={grantRoleForSmartAccount}
              >
                Enable batch editing
              </Button>
            ) : (
              <Button
                className='px-8'
                loading={mergeLoading}
                onClick={merge}
                disabled={!smartAccountPermissions.canUpdateContent}
              >
                {t('merge', { ns: 'buttons' })}
              </Button>
            )
          ) : (
            <Button className='px-8'>{t('edit', { ns: 'buttons' })}</Button>
          )}
        </Link>
      </header>

      <div className='flex flex-1 min-h-0'>
        <aside className='w-64 bg-paper flex flex-col border-r-gray-200 border-r overflow-y-auto h-full'>
          <nav className='flex-1 overflow-y-auto p-4 flex flex-col gap-1'>
            <IndexPages tokens={fullTokens} nft={nft} />
          </nav>
          <footer></footer>
        </aside>

        <div className='flex flex-col flex-1 min-h-0'>
          <div className='flex-1 overflow-auto p-4'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NftLayout
