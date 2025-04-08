import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useContentRef } from 'src/components/common/Layout/ReadLayout/ContentContext'
import HtmlRender from 'src/components/HtmlRender'
import AttestationHtmlRender from 'src/components/HtmlRender/AttestationHtmlRender'
import NftReadPageSkeleton from 'src/components/Nft/NftReadSkeleton'
import AttestationDrawer from 'src/components/Token/Attestation/AttestationDrawer'
import { SelectedSection } from 'src/components/Token/TokenView/TokenView'
import useNFT from 'src/hooks/subgraph/useNFT'
import useToken from 'src/hooks/subgraph/useToken'
import useTokenIdParam from 'src/hooks/useTokenIdParam'

const NftReadPage = () => {
  const { t } = useTranslation('nft')
  const { nftId = '' } = useParams()
  const tokenId = useTokenIdParam()
  const [selectedSection, setSelectedSection] = useState<SelectedSection>({
    id: null,
    htmlContent: null,
  })
  const { nft, loadingNft, refetchingNft } = useNFT(nftId, {
    fetchFullData: true,
    disableRefetch: true,
  })
  const { token, loadingToken, refetchingToken } = useToken(tokenId, {
    disableRefetch: true,
  })

  const { setContentElem } = useContentRef()

  const html =
    (tokenId
      ? token?.ipfsContent?.htmlContent
      : nft?.ipfsContent?.htmlContent) || ''

  const title = tokenId ? token?.name : nft?.name

  const handleSelectSection = useCallback((section: SelectedSection) => {
    console.log(section)
    setSelectedSection(section)
  }, [])

  const handleCloseDrawer = () => {
    setSelectedSection({
      id: null,
      htmlContent: null,
    })
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
      {tokenId ? (
        <AttestationHtmlRender
          id='read-page-content'
          html={html}
          ref={setContentElem}
          onSelectSection={handleSelectSection}
        />
      ) : (
        <HtmlRender html={html} ref={setContentElem} />
      )}

      <AttestationDrawer
        isOpen={!!selectedSection.id}
        section={selectedSection}
        onClose={handleCloseDrawer}
      />
    </div>
  )
}
export default NftReadPage
