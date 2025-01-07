import React, { useState } from 'react'
import { IpfsNftContent } from 'src/shared/utils/ipfs/types'
import styled from 'styled-components'
import { Editor as TinyEditorType } from 'tinymce'
import RequirePermissions from '../common/RequirePermissions'
import Flex from '../ui/Flex'
import UpdateNftContentButton from '../UpdateContent/UpdateNftContentButton'
import UpdateTokenContentButton, {
  TokenContentToUpdate,
} from '../UpdateContent/UpdateTokenContentButton'
import EditorBox from './EditorBox'
import EditorSkeleton from './EditorSkeleton'

interface EditorProps {
  name?: string
  nftAddress: string
  tokenAddress?: string | null
  initialContent: string
  logoUrl?: string | null
  onChange?: (content: string, editor: TinyEditorType) => void
  onSuccessUpdate?: () => void
  headerBackground?: string
}

interface EditorWrapperProps {
  $editorInit: boolean
}

const EditorWrapper = styled.div<EditorWrapperProps>`
  display: ${({ $editorInit }) => ($editorInit ? 'block' : 'none')};
`


const Editor: React.FC<EditorProps> = ({
  onChange,
  initialContent,
  tokenAddress,
  nftAddress,
  onSuccessUpdate,
  name,
}) => {
  const [editorInit, setEditorInit] = useState(false)
  const [currContent, setCurrContent] = useState(initialContent)

  const differentContent = initialContent !== currContent ? currContent : ''

  const tokenContentToUpdate: TokenContentToUpdate = {
    ipfsContent: { htmlContent: differentContent },
    ...(name && { name }),
  }

  const ipfsNftToUpdate: Partial<IpfsNftContent> = {
    htmlContent: differentContent,
  }

  const handleChangeContent = (content: string, editor: TinyEditorType) => {
    onChange && onChange(content, editor)
    setCurrContent(content)
  }

  return (
    <>
      <EditorWrapper $editorInit={editorInit}>
        <EditorBox
          onChange={handleChangeContent}
          onEditorInit={setEditorInit}
          initialContent={initialContent}
        />
        <Flex justifyContent='flex-end'>
          <RequirePermissions nftAddress={nftAddress} canUpdateContent>
            {tokenAddress ? (
              <UpdateTokenContentButton
                mt={15}
                onSuccess={onSuccessUpdate}
                tokenAddress={tokenAddress}
                nftAddress={nftAddress}
                tokenContentToUpdate={tokenContentToUpdate}
              />
            ) : (
              <UpdateNftContentButton
                mt={15}
                onSuccess={onSuccessUpdate}
                nftAddress={nftAddress}
                ipfsNftToUpdate={ipfsNftToUpdate}
              />
            )}
          </RequirePermissions>
        </Flex>
      </EditorWrapper>
      {!editorInit && <EditorSkeleton height={650} />}
    </>
  )
}

export default Editor
