import { useChainId } from '@thirdweb-dev/react'
import { useTranslation } from 'react-i18next'
import { generatePath, Link, useNavigate, useParams } from 'react-router-dom'
import useEdit from 'src/components/Edit/useEdit'
import useNFTRoleManager from 'src/components/Nft/NftRoleManager/useNFTRoleManager'
import Badge from 'src/components/ui-kit/Badge'
import Button from 'src/components/ui-kit/Button/Button'
import Icon from 'src/components/ui-kit/Icon/Icon'
import IconButton from 'src/components/ui-kit/IconButton'
import RadioButtonGroup from 'src/components/ui-kit/RadioButton/RadioButtonGroup'
import useNftPermissions from 'src/hooks/permissions/useNftPermissions'
import useSmartAccount from 'src/services/safe-protocol-kit/useSmartAccount'
import { Roles } from 'src/shared/enums'
import RoutePaths, { RoutePathSetting } from 'src/shared/enums/routes-paths'
import { getExplorerUrl, NFTWithMetadata } from 'src/shared/utils'

interface NftLayoutHeaderProps {
  nft: NFTWithMetadata
}

const NftLayoutHeader: React.FC<NftLayoutHeaderProps> = ({ nft }) => {
  const { t } = useTranslation()
  const { setting = null } = useParams<{ setting: RoutePathSetting }>()
  const navigate = useNavigate()

  const { smartAccountInfo } = useSmartAccount()

  const chainId = useChainId()

  const { smartAccountPermissions } = useNftPermissions(nft.id)

  const { grantRole, txLoading } = useNFTRoleManager(nft.id)

  const { merge, mergeLoading } = useEdit()

  const isEditMode = window.location.pathname.includes('edit')

  const handleIconClick = () => {
    const explorerUrl = getExplorerUrl({
      type: 'address',
      chainId,
      hash: nft.id,
    })
    window.open(explorerUrl, '_blank')
  }

  const grantRoleForSmartAccount = async () => {
    if (smartAccountInfo?.address) {
      grantRole(smartAccountInfo?.address, Roles.EDITOR)
    }
  }

  return (
    <header className='bg-paper px-4 py-2 border-b border-gray-200 flex justify-between items-center'>
      <div className='flex items-center gap-2'>
        <Link to={generatePath(RoutePaths.NFT, { nftId: nft.id })}>
          <h1 className='typo-title1 text-main-accent hover:bg-gray-100 px-2 py-1 rounded-md transition-colors'>
            {nft?.name}
          </h1>
        </Link>
        <IconButton onClick={handleIconClick}>
          <Icon name='externalLink' size={10} />
        </IconButton>
        <RadioButtonGroup
          value={setting}
          onChange={value =>
            navigate(
              generatePath(RoutePaths.SETTINGS, {
                setting: value as RoutePathSetting,
                nftId: nft.id,
              })
            )
          }
        >
          <Link
            to={generatePath(RoutePaths.SETTINGS, {
              nftId: nft.id,
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
              nftId: nft.id,
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
        <Link to={generatePath(RoutePaths.EDIT, { nftId: nft.id })}>
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
