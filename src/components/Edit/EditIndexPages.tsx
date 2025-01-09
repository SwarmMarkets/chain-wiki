import { SideContentWrap } from 'src/components/Nft/styled-components'
import Flex from 'src/components/ui/Flex'
import { useIpfsIndexPages } from 'src/hooks/ipfs/nft'
import { useEditingStore } from 'src/shared/store/editing-store'
import { NFTWithMetadata, TokensQueryFullData } from 'src/shared/utils'
import EditIndexPagesItem from './EditIndexPageItem'

interface EditIndexPagesProps {
  nft: NFTWithMetadata
  tokens: TokensQueryFullData[] | null
}

const EditIndexPages: React.FC<EditIndexPagesProps> = ({ nft, tokens }) => {
  const { indexPages = [] } = useIpfsIndexPages(nft?.indexPagesUri)

  const {
    currEditableToken,
    updateCurrEditableToken,
    updateOrCreateEditedToken,
    getEditedTokenById,
    editedNft,
    updateNft,
    editedTokens,
  } = useEditingStore()

  console.log('editedNft', editedNft)
  console.log('editedTokens', editedTokens)

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
              name={tokens?.find(t => t.id === indexPage.tokenId)?.name || ''}
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
