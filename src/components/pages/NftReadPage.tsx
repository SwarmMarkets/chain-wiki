'use client'

import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useReadContext } from '../common/Layout/ReadLayout/ClientReadLayout'
import { useContentRef } from '../common/Layout/ReadLayout/Content/context'
import MarkdownRenderer from '../Editor/MarkdownRenderer'
import AttestationDrawer from '../Token/Attestation/AttestationDrawer'

const NftReadPage = () => {
  const { setContentElem } = useContentRef()
  const { nft, selectedToken } = useReadContext()

  const { t } = useTranslation('token')

  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(
    null
  )

  const handleSelectSection = useCallback((sectionId: string) => {
    setSelectedSectionId(sectionId)
  }, [])

  const handleCloseDrawer = useCallback(() => {
    setSelectedSectionId(null)
  }, [])

  if (!nft || !selectedToken) {
    return <div className='text-center'>{t('messages.noContent')}</div>
  }

  return (
    <>
      <MarkdownRenderer
        markdown={selectedToken?.ipfsContent?.htmlContent || ''}
        showComments
        fullTokenId={selectedToken?.id}
        onClickComment={handleSelectSection}
        ref={setContentElem}
      />

      <AttestationDrawer
        nft={nft}
        isOpen={!!selectedSectionId}
        fullTokenId={selectedToken?.id || ''}
        section={{
          id: selectedSectionId || '',
          htmlContent:
            (selectedSectionId &&
              document.getElementById(selectedSectionId)?.outerHTML) ||
            '',
        }}
        onClose={handleCloseDrawer}
      />
    </>
  )
}

export default NftReadPage
