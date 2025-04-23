import Flex from 'src/components/ui/Flex'
import { useRef } from 'react'
import { TokenViewProps } from '.'
import TokenViewActions from './TokenViewActions'
import { useTranslation } from 'react-i18next'
import MarkdownRenderer from 'src/components/Editor/MarkdownWithComments'

export interface SelectedSection {
  id: string | null
  htmlContent: string | null
}

export const TokenView: React.FC<TokenViewProps> = ({ token }) => {
  const { t } = useTranslation('token')

  const contentRef = useRef<HTMLDivElement>(null)

  if (!token?.ipfsContent?.htmlContent)
    return <p className='text-center'>{t('messages.noContent')}</p>

  return (
    <Flex flexDirection='column'>
      <MarkdownRenderer
        markdown={token.ipfsContent.htmlContent}
        ref={contentRef}
      />

      <Flex justifyContent='flex-end' mt={3}>
        <TokenViewActions />
      </Flex>
    </Flex>
  )
}
