'use client'

import { useRef } from 'react'
import { TokenViewProps } from '.'
import TokenViewActions from './TokenViewActions'
import { useTranslation } from 'react-i18next'
import MarkdownRenderer from 'src/components/Editor/MarkdownRenderer'

export interface SelectedSection {
  id: string | null
  htmlContent: string | null
}

export const TokenView: React.FC<TokenViewProps> = ({ token }) => {
  const { t } = useTranslation('token')
  const contentRef = useRef<HTMLDivElement>(null)

  if (!token?.ipfsContent?.htmlContent) {
    return <p className='text-center'>{t('messages.noContent')}</p>
  }

  return (
    <div className='flex flex-col'>
      <MarkdownRenderer
        markdown={token.ipfsContent.htmlContent}
        ref={contentRef}
      />

      <div className='flex justify-end mt-3'>
        <TokenViewActions />
      </div>
    </div>
  )
}
