import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useContentRef } from 'src/components/common/Layout/ReadLayout/ContentContext'
import MarkdownRenderer from 'src/components/Editor/MarkdownWithComments'
import NftReadPageSkeleton from 'src/components/Nft/NftReadSkeleton'
import AttestationDrawer from 'src/components/Token/Attestation/AttestationDrawer'
import useNFT from 'src/hooks/subgraph/useNFT'
import useToken from 'src/hooks/subgraph/useToken'
import useFullTokenIdParam from 'src/hooks/useFullTokenIdParam'

const NftReadPage = () => {
  const { t } = useTranslation('nft')
  const { nftId = '' } = useParams()
  const tokenId = useFullTokenIdParam()
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(
    null
  )
  const { nft, loadingNft, refetchingNft } = useNFT(nftId, {
    fetchFullData: true,
    disableRefetch: true,
  })
  const { token, loadingToken, refetchingToken } = useToken(tokenId, {
    disableRefetch: true,
  })

  const html =
    (tokenId
      ? token?.ipfsContent?.htmlContent
      : nft?.ipfsContent?.htmlContent) || ''

  const title = tokenId ? token?.name : nft?.name

  const { setContentElem } = useContentRef()

  const handleSelectSection = useCallback((sectionId: string) => {
    setSelectedSectionId(sectionId)
  }, [])

  const handleCloseDrawer = () => {
    setSelectedSectionId(null)
  }

  const loading =
    (loadingNft && !refetchingNft) || (loadingToken && !refetchingToken)

  if (loading) {
    return <NftReadPageSkeleton />
  }

  if (!html) {
    return <p className='text-center'>{t('messages.noContent')}</p>
  }

  return (
    <div>
      <div className='typo-heading2 text-main-accent mb-3 font-bold'>
        {title}
      </div>
      <MarkdownRenderer
        markdown={html}
        showComments
        ref={setContentElem}
        onClickComment={handleSelectSection}
      />

      <AttestationDrawer
        isOpen={!!selectedSectionId}
        section={{
          id: selectedSectionId,
          htmlContent:
            (selectedSectionId &&
              document.getElementById(selectedSectionId)?.outerHTML) ||
            '',
        }}
        onClose={handleCloseDrawer}
      />
    </div>
  )
}
export default NftReadPage
