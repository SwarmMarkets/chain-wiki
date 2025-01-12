import Content from 'src/components/Content'
import EditIndexPages from 'src/components/Edit/EditIndexPages'
import EditorView from 'src/components/Edit/EditorView'
import useEdit from 'src/components/Edit/useEdit'
import { SideContentWrap } from 'src/components/Nft/styled-components'
import NftContentSkeleton from 'src/components/Token/TokenContentSkeleton'
import Box from 'src/components/ui/Box'
import Flex from 'src/components/ui/Flex'
import { useEditingStore } from 'src/shared/store/editing-store'

const EditPage = () => {
  const { nft, loading, fullTokens } = useEdit()

  const showSkeleton = loading
  const allLoaded = !loading

  const { currEditableToken, editedNft, editedTokens } = useEditingStore()

  const currTokenHtmlContent =
    editedTokens.find(token => token.id === currEditableToken?.id)?.content ||
    fullTokens?.find(t => t.id === currEditableToken?.id)?.ipfsContent
      ?.htmlContent

  const currNftHtmlContent = editedNft?.content || nft?.ipfsContent?.htmlContent

  const editorContent =
    (currEditableToken ? currTokenHtmlContent : currNftHtmlContent) || ''

  if (showSkeleton) {
    return (
      <Flex justifyContent='center' $gap='20px'>
        <Box width='900px'>
          <NftContentSkeleton />
        </Box>
      </Flex>
    )
  }
  const contentElem = document.createElement('div', {})
  contentElem.innerHTML = editorContent

  return (
    <Flex justifyContent={allLoaded ? 'space-between' : 'center'} $gap='20px'>
      <EditIndexPages nft={nft} tokens={fullTokens} />
      <EditorView
        nft={nft}
        content={
          (currEditableToken ? currTokenHtmlContent : currNftHtmlContent) || ''
        }
      />
      <SideContentWrap>
        <Content contentElem={contentElem} />
      </SideContentWrap>
    </Flex>
  )
}

export default EditPage
