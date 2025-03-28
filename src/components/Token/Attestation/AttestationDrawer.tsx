import LiteEditor from 'src/components/Editor/LiteEditor'
import HtmlRender from 'src/components/HtmlRender'
import Box from 'src/components/ui/Box'
import Divider from 'src/components/ui/Divider'
import Drawer from 'src/components/ui/Drawer'
import Flex from 'src/components/ui/Flex'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import MakeAttestationButton from 'src/components/UpdateContent/MakeAttestationButton'
import { useParams } from 'react-router-dom'
import { SelectedSection } from '../TokenView/TokenView'
import useComments from 'src/hooks/subgraph/useComments'
import AttestationList from './AttestationList'
import RequirePermissions from 'src/components/common/RequirePermissions'

interface AttestationDrawerProps {
  isOpen: boolean
  section: SelectedSection
  onClose: () => void
}

const AttestationDrawer: React.FC<AttestationDrawerProps> = ({
  isOpen,
  section,
  onClose,
}) => {
  const { nftId = '', tokenId = '' } = useParams()
  const { t } = useTranslation('token')
  const [editorContent, setEditorContent] = useState('')

  const { fullComments, refetchingComments, loadingComments } = useComments(
    {
      variables: { filter: { sectionId: section.id } },
    },
    { fetchFullData: true }
  )
  const showSkeletons = loadingComments && !refetchingComments

  const handleChangeEditor = (value: string) => {
    setEditorContent(value)
  }

  const handleSendAttestation = () => {
    setEditorContent('')
  }

  return (
    <Drawer
      title={t('attestation.title')}
      maxWidth='600px'
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className='flex h-full w-full flex-col justify-between'>
        <div>
          <HtmlRender html={section.htmlContent || ''} />
          <Divider />
          <AttestationList
            attestations={fullComments}
            loading={showSkeletons}
          />
        </div>
        <RequirePermissions nftAddress={nftId} canCreateAttestation>
          <div className='flex flex-col'>
            <LiteEditor
              height={200}
              onChange={handleChangeEditor}
              value={editorContent}
            />
            <MakeAttestationButton
              onSuccess={handleSendAttestation}
              nftAddress={nftId}
              sectionId={section.id}
              attestationContent={editorContent}
              tokenId={tokenId}
            >
              {t('attestation.send')}
            </MakeAttestationButton>
          </div>
        </RequirePermissions>
      </div>
    </Drawer>
  )
}

export default AttestationDrawer
