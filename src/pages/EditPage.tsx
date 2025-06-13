import EditorView from 'src/components/Edit/EditorView'
import useEdit from 'src/components/Edit/useEdit'
import NftContentSkeleton from 'src/components/Token/TokenContentSkeleton'
import Box from 'src/components/ui/Box'
import Flex from 'src/components/ui/Flex'
import { useEditingStore } from 'src/shared/store/editing-store'

const EditPage = () => {
  const { nft, loading, fullTokens } = useEdit()
  console.log(
    nft?.indexPagesContent?.indexPages,
    'nft?.indexPagesContent?.indexPages'
  )

  const showSkeleton = loading
  const allLoaded = !loading

  const { currEditableToken, getTokenById } = useEditingStore()

  const currTokenHtmlContent =
    getTokenById(currEditableToken?.id || '')?.content ??
    (fullTokens?.find(t => t.id === currEditableToken?.id)?.ipfsContent
      ?.htmlContent ||
      '')

  if (showSkeleton || !nft) {
    return (
      <Flex justifyContent='center' $gap='20px'>
        <Box className='w-full'>
          <NftContentSkeleton />
        </Box>
      </Flex>
    )
  }
  const contentElem = document.createElement('div', {})
  contentElem.innerHTML = currTokenHtmlContent

  return (
    <>
      <Flex
        className='w-full'
        justifyContent={allLoaded ? 'space-between' : 'center'}
        $gap='20px'
      >
        <EditorView content={currTokenHtmlContent} />
      </Flex>
    </>
  )
}

export default EditPage
