import HtmlRender from 'src/components/HtmlRender'
import { NFTWithMetadata } from 'src/shared/utils/ipfs/types'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import Text from 'src/components/ui/Text'
import { useTheme } from 'styled-components'
import { StyledCard } from '../styled-components'
import useNftPermissions from 'src/hooks/permissions/useNftPermissions'

interface NftViewProps {
  nft?: NFTWithMetadata | null
  onMount: (element: HTMLDivElement) => void
  onClickEditSite?: () => void
}

export const NftView: React.FC<NftViewProps> = ({
  nft,
  onMount,
  onClickEditSite,
}) => {
  const { permissions } = useNftPermissions(nft?.id)
  const contentRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslation('nft')
  const theme = useTheme()

  const onMountContent = () => {
    if (contentRef.current) {
      onMount(contentRef.current)
    }
  }

  if (!nft?.ipfsContent?.htmlContent && permissions.canUpdateContent)
    return (
      <StyledCard onClick={onClickEditSite}>
        <Text.p
          textAlign='center'
          color={theme.palette.borderPrimary}
          fontWeight={theme.fontWeights.medium}
        >
          {t('messages.editNft')}
        </Text.p>
      </StyledCard>
    )

  if (!nft?.ipfsContent?.htmlContent)
    return (
      <Text.p
        textAlign='center'
        color={theme.palette.borderPrimary}
        fontWeight={theme.fontWeights.medium}
      >
        {t('messages.noContent')}
      </Text.p>
    )

  return (
    <HtmlRender
      onMount={onMountContent}
      ref={contentRef}
      html={nft.ipfsContent.htmlContent}
    />
  )
}
