'use client'

import { useCallback, useState } from 'react'
import { useReadContext } from '../common/Layout/ReadLayout/ClientReadLayout'
import { useContentRef } from '../common/Layout/ReadLayout/Content/context'
import MarkdownRenderer from '../Editor/MarkdownRenderer'
import AttestationDrawer from './Attestation/AttestationDrawer'
import { useParams } from 'next/navigation'
import { ReadParams } from 'src/shared/consts/routes'
import { isSameEthereumAddress } from 'src/shared/utils'
import { useTranslation } from 'react-i18next'

export default function ClientTokenViewer() {
  const { setContentElem } = useContentRef()
  const { tokenIdOrSlug } = useParams<ReadParams['token']>()
  const { nft, fullTokens, firstToken } = useReadContext()

  const { t } = useTranslation('token')

  const resolvedTokenSlugOrId = tokenIdOrSlug || firstToken?.tokenId

  const token = fullTokens?.find(
    t =>
      t.slug === resolvedTokenSlugOrId ||
      isSameEthereumAddress(t.id, resolvedTokenSlugOrId)
  )

  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(
    null
  )

  const handleSelectSection = useCallback((sectionId: string) => {
    setSelectedSectionId(sectionId)
  }, [])

  const handleCloseDrawer = useCallback(() => {
    setSelectedSectionId(null)
  }, [])

  if (!nft || !token) {
    return <div className='text-center'>{t('messages.noContent')}</div>
  }

  return (
    <>
      <MarkdownRenderer
        markdown={token?.ipfsContent?.htmlContent || ''}
        showComments
        fullTokenId={token?.id}
        onClickComment={handleSelectSection}
        ref={setContentElem}
      />

      <AttestationDrawer
        nft={nft}
        isOpen={!!selectedSectionId}
        fullTokenId={token?.id || ''}
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
