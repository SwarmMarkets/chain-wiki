import React, { useEffect, useRef, useState } from 'react'
import { generatePath, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useStorage } from '@thirdweb-dev/react'
import { useTheme } from 'styled-components'
import Box from '@src/components/ui/Box'
import Flex from '@src/components/ui/Flex'
import Text from '@src/components/ui/Text'
import RoutePaths from '@src/shared/enums/routes-paths'
import {
  IpfsIndexPage,
  NFTWithMetadata,
  TokensQueryFullData,
} from '@src/shared/utils/ipfs/types'
import RequirePermissions from '../common/RequirePermissions'
import IndexPagesActions from './IndexPagesActions'
import IndexPagesEdit, { IndexPagesEditListChanges } from './IndexPagesEdit'
import { useIpfsIndexPages } from '@src/hooks/ipfs/nft'
import { StyledLink } from './styled-components'

interface IndexPagesProps {
  tokens: TokensQueryFullData[] | null
  nft: NFTWithMetadata | null
}

const IndexPages: React.FC<IndexPagesProps> = ({ tokens, nft, ...props }) => {
  const { tokenId: currentTokenId } = useParams<{ tokenId: string }>()
  const storage = useStorage()
  const theme = useTheme()
  const { t } = useTranslation(['nft', 'buttons'])
  const [isEdit, setIsEdit] = useState(false)
  const initialIndexPages = useRef<IpfsIndexPage[]>([])
  const [activeIndexPages, setActiveIndexPages] = useState<IpfsIndexPage[]>([])

  const handleSaveButton = () => {
    setIsEdit(false)
    setActiveIndexPages(initialIndexPages.current)
  }

  const handleCancelButton = () => {
    setIsEdit(false)
  }

  const handleEditButton = () => setIsEdit(true)

  const handleEditIndexPages = ({
    activeIndexPages,
  }: IndexPagesEditListChanges) => {
    setActiveIndexPages(activeIndexPages)
  }

  const noTokens = tokens?.length === 0
  const { indexPages } = useIpfsIndexPages(nft?.indexPagesUri)

  useEffect(() => {
    if (indexPages) {
      initialIndexPages.current = indexPages
      setActiveIndexPages(indexPages)
    }
  }, [indexPages, nft?.indexPagesUri, storage])

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

  const noIndexPages = !activeIndexPages || activeIndexPages.length === 0

  return (
    <Flex {...props} flexDirection='column' $gap='15px'>
      <Box maxHeight='inherit' overflowY='auto'>
        {isEdit && tokens ? (
          <IndexPagesEdit
            tokens={tokens}
            indexPages={activeIndexPages}
            onChange={handleEditIndexPages}
          />
        ) : (
          <Flex flexDirection='column' pb='8px'>
            {noIndexPages && (
              <Text
                textAlign='center'
                fontWeight={theme.fontWeights.medium}
                color={theme.palette.gray}
              >
                {t('indexPages.noIndexPages')}
              </Text>
            )}
            {activeIndexPages?.map(indexPage => {
              const path = generatePath(RoutePaths.NFT + RoutePaths.TOKEN, {
                nftId: nft?.id,
                tokenId: indexPage?.tokenId,
              })
              const isActive = currentTokenId === indexPage?.tokenId

              return (
                <StyledLink
                  to={path}
                  key={indexPage?.tokenId}
                  $isActive={isActive}
                >
                  {indexPage?.title}
                </StyledLink>
              )
            })}
          </Flex>
        )}
      </Box>
      <RequirePermissions nftAddress={nft?.id} canUpdateContent>
        <IndexPagesActions
          nftId={nft?.id}
          newIndexPages={activeIndexPages}
          isEditMode={isEdit}
          onSave={handleSaveButton}
          onCancel={handleCancelButton}
          onEdit={handleEditButton}
        />
      </RequirePermissions>
    </Flex>
  )
}

export default IndexPages
