import { useTranslation } from 'react-i18next'
import { useEditingStore } from 'src/shared/store/editing-store'
import { getUniqueId } from 'src/shared/utils'
import Button from '../ui-kit/Button/Button'
import EditIndexPagesTree from './EditIndexPagesTree/EditIndexPagesTree'
import useEdit from './useEdit'
import { generateSlug } from './utils'

const EditIndexPages = () => {
  const { t } = useTranslation('edit', { keyPrefix: 'indexPages' })

  const {
    currEditableToken,
    updateCurrEditableToken,
    addIndexPage,
    updateOrCreateAddedToken,
    addedTokens,
  } = useEditingStore()

  const {
    fullTokens,
    nextTokenId,
    treeData,
    updateIndexPagesByTreeNodes,
    updateTokenName,
  } = useEdit()

  const handleIndexPageClick = (id: string) => {
    const token = fullTokens?.find(t => t.id === id)
    const addedToken = addedTokens.find(t => t.id === id)

    if (addedToken) {
      updateCurrEditableToken(addedToken)
      return
    }
    if (token) {
      updateCurrEditableToken({
        id: token.id,
        name: token.name,
        content: token.ipfsContent?.htmlContent || '',
        slug: token.slug,
      })
    }
  }

  const handleAddPage = () => {
    if (nextTokenId) {
      const initialName = t('initialTokenName')
      const defaultSlug = 'page'

      // Ensure uniqueness for default slug only
      const occupied = new Set<string>([
        ...(fullTokens?.map(t => t.slug) || []),
        ...addedTokens.map(t => t.slug),
      ])
      let candidate = defaultSlug
      let i = 0
      while (occupied.has(candidate)) {
        i += 1
        candidate = `${defaultSlug}-${i}`
      }

      addIndexPage({
        tokenId: nextTokenId,
        title: initialName,
        slug: candidate,
        parent: 0,
      })
      updateOrCreateAddedToken({
        id: nextTokenId,
        name: initialName,
        slug: candidate,
        content: '',
      })
      updateCurrEditableToken({
        id: nextTokenId,
        name: initialName,
        slug: candidate,
        content: '',
      })
    }
  }

  const handleAddGroup = () => {
    if (nextTokenId) {
      const initialName = t('initialGroupName')
      const initialSlug = generateSlug(initialName)

      addIndexPage({
        tokenId: getUniqueId(),
        title: initialName,
        slug: initialSlug,
        type: 'group',
      })
    }
  }

  return (
    <div className='flex flex-col h-full'>
      <div className='flex-1 overflow-auto'>
        <EditIndexPagesTree
          activeTokenIdOrSlug={currEditableToken?.id}
          activeSlug={currEditableToken?.slug}
          onClick={handleIndexPageClick}
          treeData={treeData}
          onDrop={updateIndexPagesByTreeNodes}
          onUpdateName={updateTokenName}
        />
      </div>

      <div className='pt-2'>
        <Button className='w-full' onClick={handleAddPage}>
          {t('addToken')}
        </Button>
        <Button className='mt-2 w-full' onClick={handleAddGroup}>
          {t('addGroup')}
        </Button>
      </div>
    </div>
  )
}

export default EditIndexPages
