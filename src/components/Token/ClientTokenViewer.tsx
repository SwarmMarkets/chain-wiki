'use client'

import {
  NFTWithMetadata,
  TokensQueryFullData,
} from 'src/shared/utils/ipfs/types'
import MarkdownRenderer from '../Editor/MarkdownRenderer'
import AttestationDrawer from './Attestation/AttestationDrawer'
import { useState, useCallback } from 'react'
import { useContentRef } from '../common/Layout/ReadLayout/Content/context'

interface Props {
  nft: NFTWithMetadata
  token: TokensQueryFullData
}

export default function ClientTokenViewer({ nft, token }: Props) {
  const { setContentElem } = useContentRef()
 
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(
    null
  )

  const handleSelectSection = useCallback((sectionId: string) => {
    setSelectedSectionId(sectionId)
  }, [])

  const handleCloseDrawer = useCallback(() => {
    setSelectedSectionId(null)
  }, [])

  return (
    <>
      <MarkdownRenderer
        markdown={token.ipfsContent?.htmlContent || ''}
        showComments
        fullTokenId={token.id}
        onClickComment={handleSelectSection}
        ref={setContentElem}
      />

      <AttestationDrawer
        nft={nft}
        isOpen={!!selectedSectionId}
        fullTokenId={token.id}
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
