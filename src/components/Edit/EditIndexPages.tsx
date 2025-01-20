import { SideContentWrap } from 'src/components/Nft/styled-components'
import Flex from 'src/components/ui/Flex'
import { useEditingStore } from 'src/shared/store/editing-store'
import { getUniqueId, NFTWithMetadata } from 'src/shared/utils'
import EditIndexPagesItem from './EditIndexPageItem'
import EditIndexPagesTree from './EditIndexPagesTree/EditIndexPagesTree'
import useEdit from './useEdit'
import Button from '../ui/Button/Button'
import { useTranslation } from 'react-i18next'

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
      addIndexPage({ tokenId: nextTokenId, title: t('initialTokenName') })
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
    <SideContentWrap>
      <Flex flexDirection='column'>
        {
          <EditIndexPagesItem
            name={editedNft?.name || nft.name}
            active={currEditableToken === null}
            onClick={() => updateCurrEditableToken(null)}
            onEdit={handleEditNftName}
          />
        }

        <EditIndexPagesTree
          activeId={currEditableToken?.id}
          onClick={handleIndexPageClick}
        />

        <Button mt='10px' onClick={handleAddPage}>
          {t('addToken')}
        </Button>
        <Button mt='10px' onClick={handleAddGroup}>
          {t('addGroup')}
        </Button>
      </Flex>
    </SideContentWrap>
  )
}

export default EditIndexPages
