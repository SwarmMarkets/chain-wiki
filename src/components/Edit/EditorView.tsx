import { MDXEditorMethods } from '@mdxeditor/editor'
import React, { useRef } from 'react'
import Editor from 'src/components/Editor'
import useEffectCompare from 'src/hooks/useEffectCompare'
import { useEditingStore } from 'src/shared/store/editing-store'
import { generateSlug } from './utils'

interface EditorViewProps {
  content: string
}

const EditorView: React.FC<EditorViewProps> = ({ content }) => {
  const {
    currEditableToken,
    getEditedTokenById,
    getAddedTokenById,
    updateOrCreateEditedToken,
    updateOrCreateAddedToken,
  } = useEditingStore()

  const mdxRef = useRef<MDXEditorMethods>(null)

  useEffectCompare(() => {
    if (!currEditableToken) return
    mdxRef.current?.setMarkdown(content)
  }, [currEditableToken])

  const updateContent = (content: string) => {
    if (currEditableToken) {
      const addedToken = getAddedTokenById(currEditableToken.id)

      if (addedToken) {
        updateOrCreateAddedToken({ ...addedToken, content })
        return
      }
      updateOrCreateEditedToken({
        id: currEditableToken.id,
        name:
          getEditedTokenById(currEditableToken.id)?.name ||
          currEditableToken.name,
        slug:
          getEditedTokenById(currEditableToken.id)?.slug ||
          generateSlug(currEditableToken.name),
        content,
      })
    }
  }

  return <Editor ref={mdxRef} content={content} onChange={updateContent} />
}

export default EditorView
