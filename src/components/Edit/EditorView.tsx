import { MDXEditorMethods } from '@mdxeditor/editor'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import Editor from 'src/components/Editor'
import { useEditingStore } from 'src/shared/store/editing-store'
import { NFTWithMetadata } from 'src/shared/utils'

interface EditorViewProps {
  nft: NFTWithMetadata
  content: string
}

const EditorView: React.FC<EditorViewProps> = ({ nft, content }) => {
  const { nftId = '' } = useParams()

  const {
    currEditableToken,
    editedNft,
    getEditedTokenById,
    getAddedTokenById,
    updateOrCreateEditedToken,
    updateOrCreateAddedToken,
    updateNft,
  } = useEditingStore()

  const mdxRef = useRef<MDXEditorMethods>(null)

  useEffect(() => {
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
        content,
      })
    } else {
      updateNft({ id: nftId, name: editedNft?.name || nft.name, content })
    }
  }

  return <Editor ref={mdxRef} content={content} onChange={updateContent} />
}

export default EditorView
