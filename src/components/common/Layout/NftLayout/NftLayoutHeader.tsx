import React from 'react'
import { generatePath, Link, useNavigate, useParams } from 'react-router-dom'
import useEdit from 'src/components/Edit/useEdit'
import useNFTRoleManager from 'src/components/Nft/NftRoleManager/useNFTRoleManager'
import Badge from 'src/components/ui-kit/Badge'
import Button from 'src/components/ui-kit/Button/Button'
import RadioButtonGroup from 'src/components/ui-kit/RadioButton/RadioButtonGroup'
import useNftPermissions from 'src/hooks/permissions/useNftPermissions'
import useSmartAccount from 'src/services/safe-protocol-kit/useSmartAccount'
import { Roles } from 'src/shared/enums'
import RoutePaths, { RoutePathSetting } from 'src/shared/enums/routes-paths'
import { NFTWithMetadata } from 'src/shared/utils'
import NftHeaderSkeleton from './NftHeaderSkeleton'
import { useToastManager } from 'src/hooks/useToastManager'
import { useTranslation } from 'react-i18next'

interface NftLayoutHeaderProps {
  nft: NFTWithMetadata | null
  loading: boolean
}

const NftLayoutHeader: React.FC<NftLayoutHeaderProps> = ({ nft, loading }) => {
  const { nftId = '' } = useParams()
  const { t } = useTranslation(['layout', 'buttons', 'common'])
  const { setting = null } = useParams<{ setting: RoutePathSetting }>()
  const navigate = useNavigate()

  const { smartAccountInfo } = useSmartAccount()
  const { smartAccountPermissions } = useNftPermissions(nftId)
  const { grantRole, txLoading } = useNFTRoleManager(nftId)
  const { merge, mergeLoading } = useEdit()
  const { addToast } = useToastManager()

  const isEditMode = window.location.pathname.includes('edit')

  const grantRoleForSmartAccount = async () => {
    if (smartAccountInfo?.address) {
      grantRole(smartAccountInfo?.address, Roles.EDITOR)
    }
  }

  const handleMerge = async () => {
    try {
      await merge()
      const siteUrl = generatePath(RoutePaths.NFT_READ, { nftId })

      addToast(
        <>
          {t('toasts.siteUpdated', { ns: 'common' })}{' '}
          <Link
            to={siteUrl}
            target='_blank'
            className='underline text-main-accent hover:text-main'
          >
            {t('toasts.viewSite', { ns: 'common' })}
          </Link>
        </>,
        { type: 'success' }
      )
    } catch (error) {
      addToast(t('toasts.merge_error', { ns: 'common' }), { type: 'error' })
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

        <RadioButtonGroup
          value={setting}
          onChange={value =>
            navigate(
              generatePath(RoutePaths.SETTINGS, {
                setting: value,
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
                {t('enableBatchEditing', { ns: 'buttons' })}
              </Button>
            ) : (
              <Button
                className='px-8'
                loading={mergeLoading}
                onClick={handleMerge}
                disabled={!smartAccountPermissions.canUpdateContent}
              >
                {t('publish', { ns: 'buttons' })}
              </Button>
            )
          ) : (
            <Button className='px-8'>{t('edit', { ns: 'buttons' })}</Button>
          )}
        </Link>
        {!isEditMode && (
          <Link
            to={generatePath(RoutePaths.NFT_READ, { nftId })}
            target='_blank'
          >
            <Button>{t('visit', { ns: 'buttons' })}</Button>
          </Link>
        )}
      </div>
    </header>
  )
}

export default NftLayoutHeader
