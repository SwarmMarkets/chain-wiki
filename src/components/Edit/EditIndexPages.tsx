import { useTranslation } from 'react-i18next'
import { useEditingStore } from 'src/shared/store/editing-store'
import { getUniqueId } from 'src/shared/utils'
import Button from '../ui-kit/Button/Button'
import EditIndexPagesTree from './EditIndexPagesTree/EditIndexPagesTree'
import useEdit from './useEdit'

const EditIndexPages = () => {
  const { t } = useTranslation('edit', { keyPrefix: 'indexPages' })

  const {
    currEditableToken,
    updateCurrEditableToken,
    addIndexPage,
    updateOrCreateAddedToken,
    addedTokens,
  } = useEditingStore()

  const { fullTokens, nextTokenId } = useEdit()

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
      })
    }
  }

  const handleAddPage = () => {
    if (nextTokenId) {
      addIndexPage({
        tokenId: nextTokenId,
        title: t('initialTokenName'),
        parent: 0,
      })
      updateOrCreateAddedToken({
        id: nextTokenId,
        name: t('initialTokenName'),
        content: '',
      })
    }
  }
  const handleAddGroup = () => {
    if (nextTokenId) {
      addIndexPage({
        tokenId: getUniqueId(),
        title: t('initialGroupName'),
        type: 'group',
      })
    }
  }
  return (
    <div>
      <EditIndexPagesTree
        activeId={currEditableToken?.id}
        onClick={handleIndexPageClick}
      />

      <Button className='mt-2 w-full' onClick={handleAddPage}>
        {t('addToken')}
      </Button>
      <Button className='mt-2 w-full' onClick={handleAddGroup}>
        {t('addGroup')}
      </Button>
    </div>
  )
}

export default EditIndexPages
