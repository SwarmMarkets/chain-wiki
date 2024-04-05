import Box from '@src/components/ui/Box'
import Divider from '@src/components/ui/Divider'
import Flex from '@src/components/ui/Flex'
import Text from '@src/components/ui/Text'
import RoutePaths from '@src/shared/enums/routes-paths'
import { NFTQueryFullData, TokensQueryFullData } from '@src/shared/types/ipfs'
import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { generatePath } from 'react-router-dom'
import RequirePermissions from '../common/RequirePermissions'
import IndexPagesActions from './IndexPagesActions'
import { StyledLink } from './styled-components'
import { useTheme } from 'styled-components'
import IndexPagesEditList from './IndexPagesEditList'

interface IndexPagesProps {
  tokens: TokensQueryFullData[] | null
  nft: NFTQueryFullData | null
  indexPages?: string[] | null
}

const IndexPages: React.FC<IndexPagesProps> = ({ tokens, nft, ...props }) => {
  const theme = useTheme()
  const { t } = useTranslation(['nft', 'buttons'])
  const [isEdit, setIsEdit] = useState(false)
  const [selectedIndexes, setSelectedIndexes] = useState<string[]>(
    nft?.ipfsContent?.indexPages || []
  )

  const handleSaveButton = () => {
    setIsEdit(false)
  }

  const handleEditButton = () => setIsEdit(true)

  const onChangeCheckbox = (tokenId: string) => {
    if (selectedIndexes.includes(tokenId)) {
      setSelectedIndexes(selectedIndexes.filter(id => id !== tokenId))
    } else {
      setSelectedIndexes([...selectedIndexes, tokenId])
    }
  }

  const notEmptyTokens = useMemo(
    () => tokens?.filter(token => token?.ipfsContent?.name),
    [tokens]
  )
  const visibleIndexPages = useMemo(
    () =>
      nft?.ipfsContent?.indexPages
        ?.map(id => tokens?.find(token => token?.id === id))
        .filter(token => token?.ipfsContent?.name),
    [tokens, nft?.ipfsContent?.indexPages]
  )
  const noTokens = notEmptyTokens?.length === 0

  if (noTokens || !nft?.id) {
    return (
      <Box {...props}>
        <Text.h3>{t('indexPages.title')}</Text.h3>
        <Divider my='10px' />
        <Text.p
          mt={4}
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
      <Text.h3>{t('indexPages.title')}</Text.h3>
      <Divider my='10px' />
      {isEdit && notEmptyTokens ? (
        <IndexPagesEditList
          tokens={notEmptyTokens}
          selectedIndexes={selectedIndexes}
          onChangeCheckbox={onChangeCheckbox}
        />
      ) : (
        <Flex flexDirection='column' $gap='8px' py='8px'>
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
            newIndexPages={selectedIndexes}
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
