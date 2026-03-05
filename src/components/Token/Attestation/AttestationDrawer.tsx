'use client'

import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import LiteEditor from 'src/components/Editor/LiteEditor'
import HtmlRender from 'src/components/HtmlRender'
import Drawer from 'src/components/ui-kit/Drawer'
import Divider from 'src/components/ui-kit/Divider'
import MakeAttestationButton from 'src/components/UpdateContent/MakeAttestationButton'
import useComments from 'src/hooks/subgraph/useComments'
import { NFTWithMetadata } from 'src/shared/utils'
import AttestationList from './AttestationList'
import { SelectedSection } from 'src/hooks/useSelectedSection'

interface AttestationDrawerProps {
  nft: NFTWithMetadata
  isOpen: boolean
  section: SelectedSection
  onClose: () => void
  fullTokenId: string
}

const AttestationDrawer: React.FC<AttestationDrawerProps> = ({
  nft,
  isOpen,
  section,
  onClose,
  fullTokenId,
}) => {
  const { t } = useTranslation('token')
  const [editorContent, setEditorContent] = useState('')

  const { fullComments } = useComments(
    {
      variables: { filter: { sectionId: section.id } },
      skip: !section.id,
    },
    { fetchFullData: true }
  )

  const handleChangeEditor = (value: string) => {
    setEditorContent(value)
  }

  const handleSendAttestation = () => {
    setEditorContent('')
  }

  const sortedAttestationsByPreferred = useMemo(() => {
    if (!fullComments) return null

    return [...fullComments].sort((a, b) => {
      const aIsPreferred = nft.preferredAttestators.includes(a.commentator)
      const bIsPreferred = nft.preferredAttestators.includes(b.commentator)

      return Number(bIsPreferred) - Number(aIsPreferred)
    })
  }, [fullComments, nft.preferredAttestators])

  return (
    <Drawer open={isOpen} onClose={onClose} position='right'>
      <div className='flex h-full w-full flex-col justify-between'>
        <div>
          <h3 className='typo-title2 text-main-accent font-medium mb-2'>
            {t('attestation.youAreCommentingOn')}
          </h3>

          <Divider />
          <HtmlRender
            className='my-4 max-h-[30vh] overflow-y-auto'
            html={section.htmlContent || ''}
          />
          <Divider />
          <AttestationList
            nft={nft}
            attestations={sortedAttestationsByPreferred}
            tokenAddress={fullTokenId}
          />
        </div>
        <div className='flex flex-col'>
          <LiteEditor onChange={handleChangeEditor} content={editorContent} />
          <MakeAttestationButton
            onSuccess={handleSendAttestation}
            nftAddress={nft.id}
            sectionId={section.id}
            attestationContent={editorContent}
            tokenId={fullTokenId}
          >
            {t('attestation.comment')}
          </MakeAttestationButton>
        </div>
      </div>
    </Drawer>
  )
}

export default AttestationDrawer
