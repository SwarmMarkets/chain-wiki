import HtmlRender from '@src/components/HtmlRender'
import ContentMissing from '@src/components/common/ContentMissing'

import Flex from '@src/components/ui/Flex'
import { TokenQueryFullData } from '@src/shared/types/ipfs'
import { useRef } from 'react'
import ArticleViewActions from './ArticleViewActions'

interface ArticleViewProps {
  token?: TokenQueryFullData | null
  onMount: (element: HTMLDivElement) => void
}

const ArticleView: React.FC<ArticleViewProps> = ({ token, onMount }) => {
  const contentRef = useRef<HTMLDivElement>(null)

  const onMountContent = () => {
    if (contentRef.current) {
      onMount(contentRef.current)
    }
  }

  if (!token?.ipfsContent?.htmlContent)
    return <ContentMissing message='Article content missing' />

  return (
    <Flex flexDirection='column'>
      <HtmlRender
        onMount={onMountContent}
        ref={contentRef}
        html={token?.ipfsContent?.htmlContent}
      />

      <Flex justifyContent='flex-end' mt={3}>
        <ArticleViewActions />
      </Flex>
    </Flex>
  )
}

export default ArticleView
