'use client'

import { useTranslation } from 'react-i18next'
import useSelectedSection from 'src/hooks/useSelectedSection'
import { useReadContext } from '../common/Layout/ReadLayout/ClientReadLayout'
import { useContentRef } from '../common/Layout/ReadLayout/Content/context'
import MarkdownRenderer from '../Editor/MarkdownRenderer'
import AttestationDrawer from '../Token/Attestation/AttestationDrawer'

const NftReadPage = () => {
  const { setContentElem } = useContentRef()
  const { nft, selectedToken } = useReadContext()

  const { t } = useTranslation('token')
  const { selectedSection, isOpen, openSection, closeSection } =
    useSelectedSection()

  if (!nft || !selectedToken) {
    return <div className='text-center'>{t('messages.noContent')}</div>
  }

  return (
    <>
      <MarkdownRenderer
        markdown={selectedToken.ipfsContent?.htmlContent || ''}
        showComments
        fullTokenId={selectedToken.id}
        onClickComment={openSection}
        ref={setContentElem}
      />

      <AttestationDrawer
        nft={nft}
        isOpen={isOpen}
        fullTokenId={selectedToken.id}
        section={
          selectedSection
            ? selectedSection
            : {
                id: '',
                htmlContent: '',
              }
        }
        onClose={closeSection}
      />
    </>
  )
}

export default NftReadPage
