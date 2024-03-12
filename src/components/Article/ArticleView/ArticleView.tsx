import AttestationHtmlRenderWrapper from '@src/components/HtmlRender/AttestationHtmlRender'
import ContentMissing from '@src/components/common/ContentMissing'
import Flex from '@src/components/ui/Flex'
import { useRef, useState } from 'react'
import { ArticleViewProps } from '.'
import AttestationDrawer from '../Attestation/AttestationDrawer'
import ArticleViewActions from './ArticleViewActions'

export interface SelectedSection {
  id: string | null
  htmlContent: string | null
}

export const ArticleView: React.FC<ArticleViewProps> = ({
  article,
  onMount,
}) => {
  const [selectedSection, setSelectedSection] = useState<SelectedSection>({
    id: null,
    htmlContent: null,
  })
  const contentRef = useRef<HTMLDivElement>(null)

  const onMountContent = () => {
    if (contentRef.current) {
      onMount(contentRef.current)
    }
  }

  const onSelectSection = (section: SelectedSection) => {
    setSelectedSection(section)
  }

  const onCloseDrawer = () => {
    setSelectedSection({
      id: null,
      htmlContent: null,
    })
  }

  if (!article?.ipfsContent?.htmlContent)
    return <ContentMissing message='Article content missing' />

  const isOpen = !!(selectedSection.htmlContent && selectedSection.id)

  return (
    <Flex flexDirection='column'>
      <AttestationHtmlRenderWrapper
        html={article?.ipfsContent?.htmlContent}
        onSelectSection={onSelectSection}
        onMount={onMountContent}
        ref={contentRef}
      />

      <Flex justifyContent='flex-end' mt={3}>
        <ArticleViewActions />
      </Flex>

      <AttestationDrawer
        isOpen={isOpen}
        section={selectedSection}
        onClose={onCloseDrawer}
      />
    </Flex>
  )
}
