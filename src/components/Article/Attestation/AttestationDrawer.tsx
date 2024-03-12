import LiteEditor from '@src/components/Editor/LiteEditor'
import HtmlRender from '@src/components/HtmlRender'
import Box from '@src/components/ui/Box'
import Divider from '@src/components/ui/Divider'
import Drawer from '@src/components/ui/Drawer'
import Flex from '@src/components/ui/Flex'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import useProjectPermissions from '@src/hooks/permissions/useProjectPermissions'
import AttestationCard from './AttestationCard'
import MakeAttestationButton from '@src/components/UpdateContent/MakeAttestationButton'
import { useParams } from 'react-router-dom'
import { SelectedSection } from '../ArticleView/ArticleView'

interface AttestationDrawerProps {
  isOpen: boolean
  section: SelectedSection
  onClose: () => void
}

interface Attestation {
  id: number
  address: string
  message: string
  date: string
}

const AttestationDrawer: React.FC<AttestationDrawerProps> = ({
  isOpen,
  section,
  onClose,
}) => {
  const { projectId = '', articleId = '' } = useParams()
  const { t } = useTranslation('article')
  const { permissions } = useProjectPermissions()
  const [editorContent, setEditorContent] = useState('')
  const [attestations, setAttestations] = useState<Attestation[]>([])

  const handleChangeEditor = (value: string) => {
    setEditorContent(value)
  }

  // const handleSendAttestation = () => {
  //   if (!address) return

  //   setAttestations([
  //     ...attestations,
  //     {
  //       id: Date.now(),
  //       address,
  //       message: editorContent,
  //       date: dayjs().format('MMMM D, YYYY h:mm A'),
  //     },
  //   ])
  //   setEditorContent('')
  // }

  const handleDeleteAttestation = (id: number) => {
    setAttestations(attestations.filter(item => item.id !== id))
  }

  return (
    <Drawer
      title={t('attestation.title')}
      maxWidth='600px'
      isOpen={isOpen}
      onClose={onClose}
    >
      <Flex
        height={'100%'}
        width='100%'
        justifyContent='space-between'
        flexDirection='column'
      >
        <Box>
          <HtmlRender html={section.htmlContent || ''} />
          <Divider />
          <Flex flexDirection='column' py={20} $gap='10px'>
            {attestations.map(item => (
              <AttestationCard
                onDelete={() => handleDeleteAttestation(item.id)}
                key={item.id}
                address={item.address}
                message={item.message}
                date={item.date}
              />
            ))}
          </Flex>
        </Box>
        {permissions.canCreateProject && (
          <Flex flexDirection='column'>
            <LiteEditor
              height={200}
              onChange={handleChangeEditor}
              value={editorContent}
            />
            {/* <Button
              mt={2}
              disabled={!editorContent}
            >
              {t('attestation.send')}
            </Button> */}
            <MakeAttestationButton
              projectAddress={projectId}
              sectionId={section.id}
              attestationContent={editorContent}
              tokenId={articleId}
            >
              {t('attestation.send')}
            </MakeAttestationButton>
          </Flex>
        )}
      </Flex>
    </Drawer>
  )
}

export default AttestationDrawer
