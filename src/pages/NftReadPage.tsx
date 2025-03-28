import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useContentRef } from 'src/components/common/Layout/ReadLayout'
import AttestationHtmlRender from 'src/components/HtmlRender/AttestationHtmlRender'
import AttestationDrawer from 'src/components/Token/Attestation/AttestationDrawer'
import { SelectedSection } from 'src/components/Token/TokenView/TokenView'
import useNFT from 'src/hooks/subgraph/useNFT'
import useToken from 'src/hooks/subgraph/useToken'

const NftReadPage = () => {
  const { t } = useTranslation('nft')
  const { nftId = '', tokenId = '' } = useParams()
  const [selectedSection, setSelectedSection] = useState<SelectedSection>({
    id: null,
    htmlContent: null,
  })
  const { nft } = useNFT(nftId, { fetchFullData: true, disableRefetch: true })
  const { token } = useToken(tokenId, { disableRefetch: true })

  const contentRef = useContentRef()

  const html =
    (tokenId
      ? token?.ipfsContent?.htmlContent
      : nft?.ipfsContent?.htmlContent) || ''

  const title = tokenId ? token?.name : nft?.name

  const handleSelectSection = (section: SelectedSection) => {
    console.log(section)
    setSelectedSection(section)
  }

  const handleCloseDrawer = () => {
    setSelectedSection({
      id: null,
      htmlContent: null,
    })
  }

  if (!html) {
    return <p className='text-center'>{t('messages.noContent')}</p>
  }
  return (
    <div>
      <div className='typo-heading2 text-main-accent mb-3 font-bold'>
        {title}
      </div>
      <AttestationHtmlRender
        id='read-page-content'
        html={html}
        ref={contentRef}
        onSelectSection={handleSelectSection}
      />

      <AttestationDrawer
        isOpen={!!selectedSection.id}
        section={selectedSection}
        onClose={handleCloseDrawer}
      />
    </div>
  )
}
export default NftReadPage
