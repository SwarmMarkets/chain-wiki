import { useTranslation } from 'react-i18next'
import Flex from 'src/components/ui/Flex'
import { useEditingStore } from 'src/shared/store/editing-store'
import { getUniqueId, NFTWithMetadata } from 'src/shared/utils'
import Button from '../ui-kit/Button/Button'
import EditIndexPagesItem from './EditIndexPageItem'
import EditIndexPagesTree from './EditIndexPagesTree/EditIndexPagesTree'
import useEdit from './useEdit'

interface EditIndexPagesProps {
  nft: NFTWithMetadata
}

const EditIndexPages: React.FC<EditIndexPagesProps> = ({ nft }) => {
  const { t } = useTranslation('edit', { keyPrefix: 'indexPages' })

  const {
    currEditableToken,
    updateCurrEditableToken,
    editedNft,
    updateNft,
    addIndexPage,
    updateOrCreateAddedToken,
    addedTokens,
  } = useEditingStore()

  const { fullTokens, nextTokenId } = useEdit()

  const handleEditNftName = (name: string) => {
    updateNft({
      id: nft.id,
      name,
      content: editedNft?.content || nft.ipfsContent?.htmlContent || '',
    })
  }
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
      <EditIndexPagesItem
        className='mb-0.5'
        name={editedNft?.name || nft.name}
        active={currEditableToken === null}
        onClick={() => updateCurrEditableToken(null)}
        onEdit={handleEditNftName}
      />

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
