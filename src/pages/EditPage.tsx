import Content from '@src/components/Content'
import Editor from '@src/components/Editor'
import { StyledLink } from '@src/components/IndexPages/styled-components'
import { SideContentWrap } from '@src/components/Nft/styled-components'
import NftContentSkeleton from '@src/components/Token/TokenContentSkeleton'
import Box from '@src/components/ui/Box'
import Button from '@src/components/ui/Button/Button'
import Flex from '@src/components/ui/Flex'
import Icon from '@src/components/ui/Icon'
import Text from '@src/components/ui/Text'
import { useIpfsIndexPages } from '@src/hooks/ipfs/nft'
import useNFT from '@src/hooks/subgraph/useNFT'
import useTokens from '@src/hooks/subgraph/useTokens'
import { useEditingStore } from '@src/shared/store/editing-store'
import {
  getExplorerUrl,
  isSameEthereumAddress,
  unifyAddressToId,
} from '@src/shared/utils'
import { useChainId } from '@thirdweb-dev/react'
import { useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useTheme } from 'styled-components'

const EditPage = () => {
  const { t } = useTranslation('buttons')
  const { nftId = '' } = useParams()
  const theme = useTheme()
  const [contentElem, setContentElem] = useState<HTMLDivElement | null>(null)
  const { nft, loadingNft, refetchingNft } = useNFT(nftId, {
    fetchFullData: true,
  })
  const { fullTokens } = useTokens(
    {
      variables: { filter: { nft: unifyAddressToId(nftId) } },
    },
    { fetchFullData: true }
  )
  const showSkeleton = loadingNft && !refetchingNft
  const allLoaded = nft && fullTokens

  const chainId = useChainId()

  const handleIconClick = () => {
    const explorerUrl = getExplorerUrl({
      type: 'address',
      chainId,
      hash: nftId,
    })
    window.open(explorerUrl, '_blank')
  }

  const [isHovered, setIsHovered] = useState(false)

  const { indexPages = [] } = useIpfsIndexPages(nft?.indexPagesUri)

  const {
    currEditableTokenId,
    updatecurrEditableTokenId,
    nftContent,
    tokenContents,
    updateOrCreateTokenContent,
  } = useEditingStore()

  const initialEditorContent =
    (currEditableTokenId
      ? fullTokens?.find(t => t.id === currEditableTokenId)?.ipfsContent
          ?.htmlContent
      : nft?.ipfsContent?.htmlContent) || ''

  const updateContent = (content: string) => {
    if (currEditableTokenId) {
      updateOrCreateTokenContent(currEditableTokenId, content)
    }
  }

  if (showSkeleton) {
    return (
      <Flex justifyContent='center' $gap='20px'>
        <Box width='900px'>
          <NftContentSkeleton />
        </Box>
      </Flex>
    )
  }

  return (
    <Flex justifyContent={allLoaded ? 'space-between' : 'center'} $gap='20px'>
      <SideContentWrap>
        <DragDropContext onDragEnd={() => {}}>
          <Flex flexDirection='column' $gap='8px' py='8px'>
            {
              <StyledLink
                to=''
                $isActive={currEditableTokenId === null}
                onClick={() => updatecurrEditableTokenId(null)}
              >
                {nft.name}
              </StyledLink>
            }
            {indexPages.length > 0 &&
              indexPages.map(indexPage => (
                <StyledLink
                  to={''}
                  $isActive={isSameEthereumAddress(
                    currEditableTokenId,
                    indexPage.tokenId
                  )}
                  style={{ cursor: 'pointer' }}
                  key={indexPage.tokenId}
                  onClick={() => updatecurrEditableTokenId(indexPage.tokenId)}
                >
                  {indexPage.title}
                </StyledLink>
              ))}
          </Flex>
        </DragDropContext>
      </SideContentWrap>
      <Box width='900px'>
        <Flex $gap='5px' flexDirection='column'>
          <Flex
            alignItems='center'
            justifyContent='space-between'
            $gap='5px'
            mb='10px'
            style={{ position: 'relative' }}
          >
            <Text.h1 size={theme.fontSizes.large} weight={700}>
              {nft?.name}
            </Text.h1>
            <Flex $gap='10px' alignItems='center'>
              <Button>{t('merge', { ns: 'buttons' })}</Button>
              <Icon
                cursor='pointer'
                name='externalLink'
                size={10}
                color={
                  isHovered ? theme.palette.linkPrimary : theme.palette.black
                }
                onClick={handleIconClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              />
            </Flex>
          </Flex>
        </Flex>
        <Editor
          nftAddress={nftId}
          tokenAddress={currEditableTokenId}
          initialContent={initialEditorContent}
          onChange={updateContent}
        />
      </Box>
      <SideContentWrap>
        <Content contentElem={contentElem} />
      </SideContentWrap>
    </Flex>
  )
}

export default EditPage
