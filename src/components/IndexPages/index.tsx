import React, { useEffect, useRef, useState } from 'react'
import { generatePath, useLocation } from 'react-router-dom'
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
  const location = useLocation()
  const storage = useStorage()
  const theme = useTheme()
  const { t } = useTranslation(['nft', 'buttons'])
  const [isEdit, setIsEdit] = useState(false)
  const initialIndexPages = useRef<IpfsIndexPage[]>([])
  const [activeIndexPages, setActiveIndexPages] = useState<IpfsIndexPage[]>([])
  const [activeLinkId, setActiveLinkId] = useState<string | null>(null)


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

  const handleLinkClick = (tokenId: string) => {
    setActiveLinkId(tokenId)
  }

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
              const isActive = location.pathname === path

              return (
                <StyledLink
                  to={path}
                  key={indexPage?.tokenId}
                  isActive={isActive}
                  onClick={() => handleLinkClick(indexPage.tokenId)}
                  isSelected={activeLinkId === indexPage.tokenId}
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

// import React, { useState } from 'react'
// import { useTheme } from 'styled-components'
// import { ExpandableListItem } from '@src/shared/types/expandedList'
// import Icon from '../Icon'
// import {
//   StyledTitleBlock,
//   StyledList,
//   StyledListItem,
//   StyledListContainer,
// } from './styled-components'

// interface ExpandableListProps {
//   title: string
//   items: ExpandableListItem[]
//   initialExpanded?: boolean
//   onClickTitle?: () => void
//   onClickItem?: (item: ExpandableListItem) => void
//   highlightTitle?: boolean
//   activeItemId: string | null
//   setActiveItemId: React.Dispatch<React.SetStateAction<string | null>>
// }

// const ExpandableList: React.FC<ExpandableListProps> = ({
//   title,
//   items,
//   initialExpanded = false,
//   onClickTitle,
//   onClickItem,
//   highlightTitle,
//   activeItemId,
//   setActiveItemId,
// }) => {
//   const theme = useTheme()
//   const [isExpanded, setIsExpanded] = useState(initialExpanded)

//   const handleExpand = () => {
//     setIsExpanded(!isExpanded)
//   }

//   const handleClickItem = (item: ExpandableListItem) => {
//     const itemId = String(item.id)
//     setActiveItemId(activeItemId === itemId ? null : itemId)
//     if (onClickItem) onClickItem(item)
//   }

//   const isTitleActive = activeItemId !== null
//   return (
//     <StyledListContainer>
//       <StyledTitleBlock
//         $expanded={isExpanded}
//         $highlight={highlightTitle}
//         isActive={isTitleActive}
//       >
//         {items && (
//           <Icon
//             name='chevronRight'
//             color={theme.palette.textPrimary}
//             width={12}
//             height={12}
//             onClick={handleExpand}
//           />
//         )}
//         <span onClick={onClickTitle}>{title}</span>
//       </StyledTitleBlock>
//       {isExpanded && items && (
//         <StyledList>
//           {items.map(item => {
//             const isActive = activeItemId === String(item.id)
//             return (
//               <StyledListItem
//                 key={item.id}
//                 isActive={isActive}
//                 $highlight={item.highlight}
//                 onClick={() => handleClickItem(item)}
//               >
//                 {item.value}
//               </StyledListItem>
//             )
//           })}
//         </StyledList>
//       )}
//     </StyledListContainer>
//   )
// }

// export default ExpandableList