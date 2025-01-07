import { StyledLink } from 'src/components/IndexPages/styled-components'
import { SideContentWrap } from 'src/components/Nft/styled-components'
import Flex from 'src/components/ui/Flex'
import { useIpfsIndexPages } from 'src/hooks/ipfs/nft'
import { useEditingStore } from 'src/shared/store/editing-store'
import { NFTWithMetadata, TokensQueryFullData } from 'src/shared/utils'

interface EditIndexPagesProps {
  nft: NFTWithMetadata
  tokens: TokensQueryFullData[] | null
}

const EditIndexPages: React.FC<EditIndexPagesProps> = ({ nft, tokens }) => {
  const { indexPages = [] } = useIpfsIndexPages(nft?.indexPagesUri)

  const { currEditableToken, updateCurrEditableToken } = useEditingStore()

  return (
    <SideContentWrap>
      <Flex flexDirection='column' $gap='8px' py='8px'>
        {
          <StyledLink
            to=''
            $isActive={currEditableToken === null}
            onClick={() => updateCurrEditableToken(null)}
          >
            {nft.name}
          </StyledLink>
        }
        {indexPages.length > 0 &&
          indexPages.map(indexPage => (
            <StyledLink
              to={''}
              $isActive={currEditableToken?.id === indexPage.tokenId}
              style={{ cursor: 'pointer' }}
              key={indexPage.tokenId}
              onClick={() =>
                updateCurrEditableToken(
                  tokens?.find(t => t.id === indexPage.tokenId) || null
                )
              }
            >
              {indexPage.title}
            </StyledLink>
          ))}
      </Flex>
    </SideContentWrap>
  )
}

export default EditIndexPages
