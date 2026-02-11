'use client'

import { MDXEditorMethods } from '@mdxeditor/editor'
import React, { useEffect, useRef } from 'react'
import Editor from 'src/components/Editor'
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

  const lastTokenIdRef = useRef<string | null>(null)

  useEffect(() => {
    if (!currEditableToken) return

    const tokenId = currEditableToken.tokenId
    const tokenChanged = lastTokenIdRef.current !== tokenId
    const currentContent = mdxRef.current?.getMarkdown?.() ?? ''

    if (tokenChanged || content !== currentContent) {
      mdxRef.current?.setMarkdown(content)
    }

    if (tokenChanged) {
      mdxRef.current?.focus()
      lastTokenIdRef.current = tokenId
    }
  }, [content, currEditableToken])

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
