import Box from '@src/components/ui/Box'
import Flex from '@src/components/ui/Flex'
import Text from '@src/components/ui/Text'
import RoutePaths from '@src/shared/enums/routes-paths'
import {
  IpfsIndexPage,
  IpfsIndexPagesContent,
  NFTQueryFullData,
  TokensQueryFullData,
} from '@src/shared/utils/ipfs/types'
import { verifyIndexPagesValid } from '@src/shared/utils'
import { useStorage } from '@thirdweb-dev/react'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { generatePath } from 'react-router-dom'
import { useTheme } from 'styled-components'
import RequirePermissions from '../common/RequirePermissions'
import IndexPagesActions from './IndexPagesActions'
import IndexPagesEdit, { IndexPagesEditListChanges } from './IndexPagesEdit'
import { StyledLink } from './styled-components'

interface IndexPagesProps {
  tokens: TokensQueryFullData[] | null
  nft: NFTQueryFullData | null
  indexPages?: string[] | null
}

const IndexPages: React.FC<IndexPagesProps> = ({ tokens, nft, ...props }) => {
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

  const handleEditButton = () => setIsEdit(true)

  const handleEditIndexPages = ({
    activeIndexPages,
  }: IndexPagesEditListChanges) => {
    setActiveIndexPages(activeIndexPages)
  }

  const noTokens = tokens?.length === 0

  useEffect(() => {
    const fetchActivePages = async () => {
      if (nft?.indexPagesUri) {
        const activePagesContent: IpfsIndexPagesContent | undefined =
          await storage?.downloadJSON(nft?.indexPagesUri)

        if (activePagesContent && verifyIndexPagesValid(activePagesContent)) {
          initialIndexPages.current = activePagesContent.indexPages
          setActiveIndexPages(activePagesContent.indexPages)
        }
      }
    }
    fetchActivePages()
  }, [nft?.indexPagesUri, storage])

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

  const noIndexPages = !activeIndexPages || activeIndexPages?.length === 0

  return (
    <Box {...props}>
      {isEdit && tokens ? (
        <IndexPagesEdit
          tokens={tokens}
          indexPages={activeIndexPages}
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
          {activeIndexPages?.map(indexPage => (
            <StyledLink
              to={generatePath(RoutePaths.NFT + RoutePaths.TOKEN, {
                nftId: nft?.id,
                tokenId: indexPage?.tokenId,
              })}
              key={indexPage?.tokenId}
            >
              {indexPage?.title}
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
