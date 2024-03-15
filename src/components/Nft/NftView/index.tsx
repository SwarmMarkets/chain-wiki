import HtmlRender from '@src/components/HtmlRender'
import ContentMissing from '@src/components/common/ContentMissing'
import { NFTQueryFullData } from '@src/shared/types/ipfs'
import { useRef } from 'react'

interface NftViewProps {
  nft?: NFTQueryFullData | null
  onMount: (element: HTMLDivElement) => void
}

export const NftView: React.FC<NftViewProps> = ({ nft, onMount }) => {
  const contentRef = useRef<HTMLDivElement>(null)

  const onMountContent = () => {
    if (contentRef.current) {
      onMount(contentRef.current)
    }
  }

  if (!nft?.ipfsContent?.htmlContent)
    return <ContentMissing message='Nft content missing' />

  return (
    <HtmlRender
      onMount={onMountContent}
      ref={contentRef}
      html={nft.ipfsContent.htmlContent}
    />
  )
}
