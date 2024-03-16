import HtmlRender from '@src/components/HtmlRender'
import { NFTQueryFullData } from '@src/shared/types/ipfs'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import Text from '@src/components/ui/Text'
import { useTheme } from 'styled-components'
import { StyledCard } from '../styled-components'

interface NftViewProps {
  nft?: NFTQueryFullData | null
  onMount: (element: HTMLDivElement) => void
  onClickEditSite: () => void
}

export const NftView: React.FC<NftViewProps> = ({
  nft,
  onMount,
  onClickEditSite,
}) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslation(['nft'])
  const theme = useTheme()

  const onMountContent = () => {
    if (contentRef.current) {
      onMount(contentRef.current)
    }
  }

  if (!nft?.ipfsContent?.htmlContent)
    return (
      <StyledCard onClick={onClickEditSite}>
        <Text.p textAlign='center' color={theme.palette.borderPrimary}>
          {t('messages.editNft')}
        </Text.p>
      </StyledCard>
    )

  return (
    <HtmlRender
      onMount={onMountContent}
      ref={contentRef}
      html={nft.ipfsContent.htmlContent}
    />
  )
}
