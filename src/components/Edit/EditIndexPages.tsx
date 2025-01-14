import { SideContentWrap } from 'src/components/Nft/styled-components'
import Flex from 'src/components/ui/Flex'
import { useEditingStore } from 'src/shared/store/editing-store'
import { NFTWithMetadata } from 'src/shared/utils'
import EditIndexPagesItem from './EditIndexPageItem'
import EditIndexPagesTree from './EditIndexPagesTree/EditIndexPagesTree'

interface EditIndexPagesProps {
  nft: NFTWithMetadata
}

const EditIndexPages: React.FC<EditIndexPagesProps> = ({ nft }) => {
  const { currEditableToken, updateCurrEditableToken, editedNft, updateNft } =
    useEditingStore()

  const handleEditNftName = (name: string) => {
    updateNft({
      id: nft.id,
      name,
      content: editedNft?.content || nft.ipfsContent?.htmlContent || '',
    })
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
        <EditIndexPagesTree />
      </Flex>
    </SideContentWrap>
  )
}

export default EditIndexPages
