import React from 'react'
import { useChainId } from '@thirdweb-dev/react'
import { useTranslation } from 'react-i18next'
import { generatePath, Link, useNavigate, useParams } from 'react-router-dom'
import useEdit from 'src/components/Edit/useEdit'
import useNFTRoleManager from 'src/components/Nft/NftRoleManager/useNFTRoleManager'
import Badge from 'src/components/ui-kit/Badge'
import Button from 'src/components/ui-kit/Button/Button'
import Icon from 'src/components/ui-kit/Icon/Icon'
import RadioButtonGroup from 'src/components/ui-kit/RadioButton/RadioButtonGroup'
import useNftPermissions from 'src/hooks/permissions/useNftPermissions'
import useSmartAccount from 'src/services/safe-protocol-kit/useSmartAccount'
import { Roles } from 'src/shared/enums'
import RoutePaths, { RoutePathSetting } from 'src/shared/enums/routes-paths'
import { getExplorerUrl, NFTWithMetadata } from 'src/shared/utils'
import NftHeaderSkeleton from './NftHeaderSkeleton'

interface NftLayoutHeaderProps {
  nft: NFTWithMetadata | null
  loading: boolean
}

const NftLayoutHeader: React.FC<NftLayoutHeaderProps> = ({ nft, loading }) => {
  const { nftId = '' } = useParams()
  const { t } = useTranslation(['layout', 'buttons'])
  const { setting = null } = useParams<{ setting: RoutePathSetting }>()
  const navigate = useNavigate()

  const { smartAccountInfo } = useSmartAccount()
  const chainId = useChainId()
  const { smartAccountPermissions } = useNftPermissions(nftId)
  const { grantRole, txLoading } = useNFTRoleManager(nftId)
  const { merge, mergeLoading } = useEdit()

  const isEditMode = window.location.pathname.includes('edit')

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

  if (loading) {
    return <NftHeaderSkeleton />
  }

  return (
    <header className='bg-paper px-4 py-2 border-b border-gray-200 flex justify-between items-center'>
      <div className='flex items-center gap-2'>
        <Link to={generatePath(RoutePaths.NFT, { nftId })}>
          <h1 className='typo-title1 text-main-accent hover:bg-gray-100 px-2 py-1 rounded-md transition-colors'>
            {nft?.name}
          </h1>
        </Link>
        <div
          onClick={handleIconClick}
          className='flex items-center gap-1 hover:bg-gray-100 px-2 py-1 rounded-md cursor-pointer'
        >
          <div className='typo-body1'>{t('header.viewContract')}</div>
          <Icon name='externalLink' size={10} />
        </div>
        <RadioButtonGroup
          value={setting}
          onChange={value =>
            navigate(
              generatePath(RoutePaths.SETTINGS, {
                setting: value as RoutePathSetting,
                nftId,
              })
            )
          }
        >
          <Link
            to={generatePath(RoutePaths.SETTINGS, {
              nftId,
              setting: RoutePathSetting.CUSTOMIZATION,
            })}
          >
            <Badge
              color='secondary'
              value={RoutePathSetting.CUSTOMIZATION}
              active={setting === RoutePathSetting.CUSTOMIZATION}
            >
              Customization
            </Badge>
          </Link>
          <Link
            to={generatePath(RoutePaths.SETTINGS, {
              nftId,
              setting: RoutePathSetting.GENERAL,
            })}
          >
            <Badge
              color='secondary'
              value={RoutePathSetting.GENERAL}
              active={setting === RoutePathSetting.GENERAL}
            >
              Settings
            </Badge>
          </Link>
        </RadioButtonGroup>
      </div>

      <div className='flex gap-2 items-center'>
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
      </div>
    </header>
  )
}

export default NftLayoutHeader
