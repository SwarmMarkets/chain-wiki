import { SideContentWrap } from 'src/components/Nft/styled-components'
import Flex from 'src/components/ui/Flex'
import { useEditingStore } from 'src/shared/store/editing-store'
import { NFTWithMetadata, TokensQueryFullData } from 'src/shared/utils'
import EditIndexPagesItem from './EditIndexPageItem'
import useEdit from './useEdit'

interface EditIndexPagesProps {
  nft: NFTWithMetadata
  tokens: TokensQueryFullData[] | null
}

const EditIndexPages: React.FC<EditIndexPagesProps> = ({ nft, tokens }) => {
  const {
    currEditableToken,
    updateCurrEditableToken,
    updateOrCreateEditedToken,
    getEditedTokenById,
    editedNft,
    updateNft,
    updateIndexPage,
  } = useEditingStore()

  const { indexPages } = useEdit()

  const handleEditTokenName = (name: string) => {
    if (currEditableToken) {
      const content =
        getEditedTokenById(currEditableToken?.id)?.content ||
        currEditableToken?.ipfsContent?.htmlContent ||
        ''

      updateOrCreateEditedToken({
        id: currEditableToken?.id,
        name,
        content,
      })

      const indexPageToUpdate = indexPages.find(
        p => p.tokenId === currEditableToken?.id
      )
      if (indexPageToUpdate) {
        updateIndexPage({ ...indexPageToUpdate, title: name })
      }
    }
  }

  const handleEditNftName = (name: string) => {
    updateNft({
      id: nft.id,
      name,
      content: editedNft?.content || nft.ipfsContent?.htmlContent || '',
    })
  }

  return (
    <SideContentWrap>
      <Flex flexDirection='column' $gap='8px' py='8px'>
        {
          <EditIndexPagesItem
            name={nft.name}
            active={currEditableToken === null}
            onClick={() => updateCurrEditableToken(null)}
            onEdit={handleEditNftName}
          />
        }
        {indexPages.length > 0 &&
          indexPages.map(indexPage => (
            <EditIndexPagesItem
              name={indexPage?.title || ''}
              active={currEditableToken?.id === indexPage.tokenId}
              key={indexPage.tokenId}
              onClick={() =>
                updateCurrEditableToken(
                  tokens?.find(t => t.id === indexPage.tokenId) || null
                )
              }
              onEdit={handleEditTokenName}
            />
          ))}
      </Flex>
    </SideContentWrap>
  )
}

export default EditIndexPages
