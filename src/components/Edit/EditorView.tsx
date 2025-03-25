import React from 'react'
import { useParams } from 'react-router-dom'
import EditorBox from 'src/components/Editor/EditorBox'
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

  return <EditorBox content={content} onChange={updateContent} />
}

export default EditorView
