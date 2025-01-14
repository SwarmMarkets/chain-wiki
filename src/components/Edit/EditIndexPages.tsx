import { SideContentWrap } from 'src/components/Nft/styled-components'
import Flex from 'src/components/ui/Flex'
import { useEditingStore } from 'src/shared/store/editing-store'
import { NFTWithMetadata, TokensQueryFullData } from 'src/shared/utils'
import EditIndexPagesItem from './EditIndexPageItem'
import Text from '../ui/Text'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'styled-components'
import Divider from '../ui/Divider'
import EditIndexPagesTree from './EditIndexPagesTree/EditIndexPagesTree'

interface EditIndexPagesProps {
  nft: NFTWithMetadata
}

const EditIndexPages: React.FC<EditIndexPagesProps> = ({ nft }) => {
  const { t } = useTranslation('edit', { keyPrefix: 'indexPages' })
  const theme = useTheme()

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
            name={nft.name}
            active={currEditableToken === null}
            onClick={() => updateCurrEditableToken(null)}
            onEdit={handleEditNftName}
          />
        }
        <EditIndexPagesTree />
      </Flex>

      <Divider mt={1} mb={2} />
      <Text fontWeight={theme.fontWeights.medium}>{t('hiddenPages')}</Text>
    </SideContentWrap>
  )
}

export default EditIndexPages
