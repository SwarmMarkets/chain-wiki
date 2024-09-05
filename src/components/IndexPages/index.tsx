import Box from '@src/components/ui/Box'
import Flex from '@src/components/ui/Flex'
import Text from '@src/components/ui/Text'
import RoutePaths from '@src/shared/enums/routes-paths'
import {
  IpfsIndexPage,
  NFTQueryFullData,
  TokensQueryFullData,
} from '@src/shared/types/ipfs'
import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { generatePath } from 'react-router-dom'
import RequirePermissions from '../common/RequirePermissions'
import IndexPagesActions from './IndexPagesActions'
import { StyledLink } from './styled-components'
import { useTheme } from 'styled-components'
import IndexPagesEdit, { IndexPagesEditListChanges } from './IndexPagesEdit'

interface IndexPagesProps {
  tokens: TokensQueryFullData[] | null
  nft: NFTQueryFullData | null
  indexPages?: string[] | null
}

const IndexPages: React.FC<IndexPagesProps> = ({ tokens, nft, ...props }) => {
  const theme = useTheme()
  const { t } = useTranslation(['nft', 'buttons'])
  const [isEdit, setIsEdit] = useState(false)
  const [activeIndexPages, setActiveIndexPages] = useState<IpfsIndexPage[]>([])

  const handleSaveButton = () => {
    setIsEdit(false)
  }

  const handleEditButton = () => setIsEdit(true)

  const handleEditIndexPages = ({
    activeIndexPages,
  }: IndexPagesEditListChanges) => {
    setActiveIndexPages(activeIndexPages)
  }

  const notEmptyTokens = useMemo(
    () => tokens?.filter(token => token?.name),
    [tokens]
  )
  const visibleIndexPages = useMemo(
    () =>
      nft?.ipfsContent?.index
        ?.map(id => tokens?.find(token => token?.id === id))
        .filter(token => token?.ipfsContent?.name),
    [nft?.ipfsContent?.index, tokens]
  )
  const noTokens = notEmptyTokens?.length === 0
  console.log(nft)
  console.log(activeIndexPages)
  if (noTokens || !nft?.id) {
    return (
      <Box {...props}>
        <Text.p
          textAlign='center'
          fontWeight={theme.fontWeights.medium}
          color={theme.palette.gray}
        >
          {t('indexPages.noTokens')}
        </Text.p>
      </Box>
    )
  }

  const noIndexPages = !visibleIndexPages || visibleIndexPages?.length === 0

  return (
    <Box {...props}>
      {isEdit && notEmptyTokens ? (
        <IndexPagesEdit
          tokens={notEmptyTokens}
          indexPages={[]}
          onChange={handleEditIndexPages}
        />
      ) : (
        <Flex flexDirection='column' $gap='8px' pb='8px'>
          {noIndexPages && (
            <Text
              textAlign='center'
              fontWeight={theme.fontWeights.medium}
              color={theme.palette.gray}
            >
              {t('indexPages.noIndexPages')}
            </Text>
          )}
          {visibleIndexPages?.map(token => (
            <StyledLink
              to={generatePath(RoutePaths.NFT + RoutePaths.TOKEN, {
                nftId: nft?.id,
                tokenId: token?.id,
              })}
              key={token?.id}
            >
              {token?.ipfsContent?.name}
            </StyledLink>
          ))}
        </Flex>
      )}

      <RequirePermissions nftAddress={nft?.id} canUpdateContent>
        <Box mt={4}>
          <IndexPagesActions
            nftId={nft?.id}
            newIndexPages={activeIndexPages}
            isEditMode={isEdit}
            onSave={handleSaveButton}
            onEdit={handleEditButton}
            onCancel={handleSaveButton}
          />
        </Box>
      </RequirePermissions>
    </Box>
  )
}
export default IndexPages
