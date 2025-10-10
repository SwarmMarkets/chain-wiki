'use client'

import EditorView from 'src/components/Edit/EditorView'
import useEdit from 'src/components/Edit/useEdit'
import NftContentSkeleton from 'src/components/Token/TokenContentSkeleton'
import { useEditingStore } from 'src/shared/store/editing-store'

const EditPage = () => {
  const { nft, loading, fullTokens } = useEdit()
  const { currEditableToken, getTokenById } = useEditingStore()

  const showSkeleton = loading
  const allLoaded = !loading

  const currTokenHtmlContent =
    getTokenById(currEditableToken?.id || '')?.content ??
    (fullTokens?.find(t => t.id === currEditableToken?.id)?.ipfsContent
      ?.htmlContent ||
      '')

  if (showSkeleton || !nft) {
    return (
      <div className='flex justify-center gap-5 w-full'>
        <div className='w-full'>
          <NftContentSkeleton />
        </div>
      </div>
    )
  }

  const contentElem = document.createElement('div')
  contentElem.innerHTML = currTokenHtmlContent

  return (
    <div
      className={`flex w-full ${
        allLoaded ? 'justify-between' : 'justify-center'
      } gap-5`}
    >
      <EditorView content={currTokenHtmlContent} />
    </div>
  )
}

export default EditPage
