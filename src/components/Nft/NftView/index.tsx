import HtmlRender from 'src/components/HtmlRender'
import { NFTWithMetadata } from 'src/shared/utils/ipfs/types'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import Text from 'src/components/ui/Text'
import { useTheme } from 'styled-components'

interface NftViewProps {
  nft?: NFTWithMetadata | null
  onMount: (element: HTMLDivElement) => void
}

export const NftView: React.FC<NftViewProps> = ({ nft, onMount }) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslation('nft')
  const theme = useTheme()

  const onMountContent = () => {
    if (contentRef.current) {
      onMount(contentRef.current)
    }
  }

  if (!nft?.ipfsContent?.htmlContent)
    return <p className='text-center'>{t('messages.noContent')}</p>

  return (
    <HtmlRender
      onMount={onMountContent}
      ref={contentRef}
      html={nft.ipfsContent.htmlContent}
    />
  )
}
