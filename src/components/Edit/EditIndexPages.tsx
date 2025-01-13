import { SideContentWrap } from 'src/components/Nft/styled-components'
import Flex from 'src/components/ui/Flex'
import { useEditingStore } from 'src/shared/store/editing-store'
import { NFTWithMetadata, TokensQueryFullData } from 'src/shared/utils'
import EditIndexPagesItem from './EditIndexPageItem'
import useEdit from './useEdit'
import Text from '../ui/Text'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'styled-components'
import Divider from '../ui/Divider'
import EditIndexPageList from './EditIndexPageList'

interface EditIndexPagesProps {
  nft: NFTWithMetadata
  tokens: TokensQueryFullData[] | null
}

const EditIndexPages: React.FC<EditIndexPagesProps> = ({ nft, tokens }) => {
  const { t } = useTranslation('edit', { keyPrefix: 'indexPages' })
  const theme = useTheme()

  const { currEditableToken, updateCurrEditableToken, editedNft, updateNft } =
    useEditingStore()

  const { hiddenIndexPages, updateTokenName } = useEdit()

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
        <EditIndexPageList />
      </Flex>

      <Divider mt={1} mb={2} />
      <Text fontWeight={theme.fontWeights.medium}>{t('hiddenPages')}</Text>

      <Flex mt={1} flexDirection='column'>
        {hiddenIndexPages.length > 0 &&
          hiddenIndexPages.map(indexPage => (
            <EditIndexPagesItem
              name={indexPage?.name || ''}
              active={currEditableToken?.id === indexPage.id}
              key={indexPage.id}
              onClick={() =>
                updateCurrEditableToken(
                  tokens?.find(t => t.id === indexPage.id) || null
                )
              }
              onEdit={name => updateTokenName(indexPage.id, name)}
            />
          ))}
      </Flex>
    </SideContentWrap>
  )
}

export default EditIndexPages
