import AttestationHtmlRenderWrapper from '@src/components/HtmlRender/AttestationHtmlRender'
import ContentMissing from '@src/components/common/ContentMissing'
import Flex from '@src/components/ui/Flex'
import { useRef, useState } from 'react'
import { ArticleViewProps } from '.'
import AttestationDrawer from '../Attestation/AttestationDrawer'
import ArticleViewActions from './ArticleViewActions'

export const ArticleView: React.FC<ArticleViewProps> = ({
  article,
  onMount,
}) => {
  const [selectedSection, setSelectedSection] = useState('')
  const contentRef = useRef<HTMLDivElement>(null)

  const onMountContent = () => {
    if (contentRef.current) {
      onMount(contentRef.current)
    }
  }

  const onSelectSection = (html: string) => {
    setSelectedSection(html)
  }

  const onCloseDrawer = () => {
    setSelectedSection('')
  }

  if (!article?.ipfsContent?.htmlContent)
    return <ContentMissing message='Article content missing' />

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
        isOpen={!!selectedSection}
        contentHtml={selectedSection}
        onClose={onCloseDrawer}
      />
    </Flex>
  )
}
