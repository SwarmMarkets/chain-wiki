import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import RequirePermissions from 'src/components/common/RequirePermissions'
import LiteEditor from 'src/components/Editor/LiteEditor'
import HtmlRender from 'src/components/HtmlRender'
import Divider from 'src/components/ui/Divider'
import MakeAttestationButton from 'src/components/UpdateContent/MakeAttestationButton'
import useComments from 'src/hooks/subgraph/useComments'
import { SelectedSection } from '../TokenView/TokenView'
import AttestationList from './AttestationList'
import Drawer from 'src/components/ui-kit/Drawer'
import useFullTokenIdParam from 'src/hooks/useFullTokenIdParam'

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
  const { nftId = '' } = useParams()
  const tokenId = useFullTokenIdParam()
  const { t } = useTranslation('token')
  const [editorContent, setEditorContent] = useState('')

  const { fullComments, refetchingComments, loadingComments } = useComments(
    {
      variables: { filter: { sectionId: section.id } },
    },
    { fetchFullData: true }
  )

  const handleChangeEditor = (value: string) => {
    setEditorContent(value)
  }

  const handleSendAttestation = () => {
    setEditorContent('')
  }

  return (
    <Drawer open={isOpen} onClose={onClose} position='right'>
      <div className='flex h-full w-full flex-col justify-between'>
        <div>
          <HtmlRender html={section.htmlContent || ''} />
          <Divider />
          <AttestationList attestations={fullComments} />
        </div>
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
      </div>
    </Drawer>
  )
}

export default AttestationDrawer
