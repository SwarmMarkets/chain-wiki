import Link from 'next/link'
import { useParams, usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { useTranslation } from 'react-i18next'
import useEdit from 'src/components/Edit/useEdit'
import useNFTRoleManager from 'src/components/Nft/NftRoleManager/useNFTRoleManager'
import Badge from 'src/components/ui-kit/Badge'
import Button from 'src/components/ui-kit/Button/Button'
import Icon from 'src/components/ui-kit/Icon/Icon'
import RadioButtonGroup from 'src/components/ui-kit/RadioButton/RadioButtonGroup'
import useNftPermissions from 'src/hooks/permissions/useNftPermissions'
import useNFTIdParam from 'src/hooks/useNftIdParam'
import useSmartAccount from 'src/services/safe-protocol-kit/useSmartAccount'
import Routes, { MParams } from 'src/shared/consts/routes'
import { Roles } from 'src/shared/enums'
import { RoutePathSetting } from 'src/shared/enums/routes-paths'
import { generateSiteLink, NFTWithMetadata } from 'src/shared/utils'
import NftHeaderSkeleton from './NftHeaderSkeleton'

interface NftLayoutHeaderProps {
  nft: NFTWithMetadata | null
  loading: boolean
}

const NftLayoutHeader: React.FC<NftLayoutHeaderProps> = ({ nft, loading }) => {
  const { nftId } = useNFTIdParam()
  const { t } = useTranslation(['layout', 'buttons', 'common'])
  const { setting = null } = useParams<MParams['settings']>()
  const router = useRouter()

  const { smartAccountInfo } = useSmartAccount()
  const { smartAccountPermissions } = useNftPermissions(nftId)
  const { grantRole, txLoading } = useNFTRoleManager(nftId)
  const { merge, mergeLoading } = useEdit()

  const pathname = usePathname()

  const isEditMode = pathname.includes('/edit/')

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
        <Link href={Routes.manager.nft(nft?.slug || '')}>
          <h1 className='typo-title1 text-main-accent hover:bg-gray-100 px-2 py-1 rounded-md transition-colors'>
            {nft?.name}
          </h1>
        </Link>

        <RadioButtonGroup
          value={setting}
          onChange={value =>
            nft?.slug &&
            value &&
            router.push(Routes.manager.settings(nft.slug, value))
          }
        >
          <Link
            href={Routes.manager.settings(
              nft?.slug || '',
              RoutePathSetting.CUSTOMIZATION
            )}
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
            href={Routes.manager.settings(
              nft?.slug || '',
              RoutePathSetting.GENERAL
            )}
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

      <div className='flex items-center gap-2'>
        <Link href={Routes.manager.edit(nft?.slug || '')}>
          {isEditMode ? (
            !smartAccountPermissions.canUpdateContent ? (
              <Button
                size='sm'
                loading={txLoading}
                onClick={grantRoleForSmartAccount}
              >
                {t('enableBatchEditing', { ns: 'buttons' })}
              </Button>
            ) : (
              <Button
                size='sm'
                loading={mergeLoading}
                onClick={merge}
                disabled={!smartAccountPermissions.canUpdateContent}
              >
                {t('publish', { ns: 'buttons' })}
              </Button>
            )
          ) : (
            <Button
              StartAdornment={
                <Icon
                  size={20}
                  name='edit-paper'
                  className='text-primary-contrast'
                />
              }
              size='sm'
            >
              {t('edit', { ns: 'buttons' })}
            </Button>
          )}
        </Link>
        {!isEditMode && nft && (
          <Link
            href={generateSiteLink({ nftIdOrSlug: nft.slug })}
            target='_blank'
          >
            <Button
              size='sm'
              StartAdornment={
                <Icon
                  size={20}
                  name='external-link'
                  className='text-primary-contrast'
                />
              }
            >
              {t('visit', { ns: 'buttons' })}
            </Button>
          </Link>
        )}
      </div>
    </header>
  )
}

export default NftLayoutHeader
