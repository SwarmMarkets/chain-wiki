'use client'

import { MDXEditorMethods } from '@mdxeditor/editor'
import React, { useRef } from 'react'
import Editor from 'src/components/Editor'
import useEffectCompare from 'src/hooks/useEffectCompare'
import { useEditingStore } from 'src/shared/store/editing-store'
import useEdit from './useEdit'

interface EditorViewProps {
  content: string
}

const EditorView: React.FC<EditorViewProps> = ({ content }) => {
  const {
    getAddedTokenById,
    updateOrCreateEditedToken,
    updateOrCreateAddedToken,
  } = useEditingStore()
  const { currEditableToken } = useEdit()

  const mdxRef = useRef<MDXEditorMethods>(null)

  useEffectCompare(() => {
    if (!currEditableToken) return
    mdxRef.current?.setMarkdown(content)
    mdxRef.current?.focus()
  }, [currEditableToken])

  const updateContent = (content: string) => {
    if (currEditableToken) {
      const addedToken = getAddedTokenById(currEditableToken.tokenId)

      if (addedToken) {
        updateOrCreateAddedToken({ ...addedToken, content })
        return
      }

      updateOrCreateEditedToken({
        id: currEditableToken.tokenId,
        name: currEditableToken.title,
        slug: currEditableToken.slug,
        content,
      })
    }
  }

  return <Editor ref={mdxRef} content={content} onChange={updateContent} />
}

export default EditorView
