import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import HtmlRender from 'src/components/HtmlRender'
import { NFTWithMetadata } from 'src/shared/utils/ipfs/types'

interface NftViewProps {
  nft?: NFTWithMetadata | null
  onMount?: (element: HTMLDivElement) => void
}

export const NftView: React.FC<NftViewProps> = ({ nft, onMount }) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslation('nft')

  const onMountContent = () => {
    if (contentRef.current) {
      onMount?.(contentRef.current)
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
