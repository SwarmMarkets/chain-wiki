import { TransactionBase } from '@safe-global/types-kit'
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
import { useSX1155NFT } from '@src/hooks/contracts/useSX1155NFT'
import { useIpfsIndexPages } from '@src/hooks/ipfs/nft'
import useNFT from '@src/hooks/subgraph/useNFT'
import useTokens from '@src/hooks/subgraph/useTokens'
import useNFTUpdate from '@src/hooks/useNFTUpdate'
import useSmartAccount from '@src/services/safe-protocol-kit/useSmartAccount'
import { useEditingStore } from '@src/shared/store/editing-store'
import {
  generateIpfsTokenContent,
  getExplorerUrl,
  isSameEthereumAddress,
  resolveAllThirdwebTransactions,
  unifyAddressToId,
} from '@src/shared/utils'
import { Transaction, useChainId, useStorageUpload } from '@thirdweb-dev/react'
import { useMemo, useRef, useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useTheme } from 'styled-components'

const EditPage = () => {
  const { t } = useTranslation('buttons')
  const { nftId = '' } = useParams()
  const theme = useTheme()
  const { smartAccount } = useSmartAccount()
  const { mutateAsync: upload } = useStorageUpload()
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
  const { contract: sx1555NFTContract } = useSX1155NFT(nftId)
  const { uploadContent } = useNFTUpdate(nftId)
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
    updateCurrEditableTokenId,
    nftContent,
    tokenContents,
    updateOrCreateTokenContent,
    updateNftContent,
  } = useEditingStore()

  const currTokenHtmlContent =
    tokenContents.find(token => token.id === currEditableTokenId)?.content ||
    fullTokens?.find(t => t.id === currEditableTokenId)?.ipfsContent
      ?.htmlContent

  const currNftHtmlContent =
    nftContent?.content || nft?.ipfsContent?.htmlContent

  const initialEditorContent = useMemo(
    () =>
      (currEditableTokenId ? currTokenHtmlContent : currNftHtmlContent) || '',
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currEditableTokenId]
  )

  const updateContent = (content: string) => {
    if (currEditableTokenId) {
      updateOrCreateTokenContent(currEditableTokenId, content)
    } else {
      updateNftContent(nftId, content)
    }
  }

  const handleMerge = async () => {
    const txs: Transaction[] = []
    if (nftContent) {
      const ipfsUri = await uploadContent({
        address: nftId,
        htmlContent: nftContent.content,
      })
      if (ipfsUri) {
        const nftContentUpdateTx = sx1555NFTContract.prepare('setContractUri', [
          ipfsUri,
        ])
        txs.push(nftContentUpdateTx)
      }
    }
    if (tokenContents.length > 0) {
      for (const tokenContent of tokenContents) {
        const tokenId = +tokenContent.id.split('-')[1]
        const ipfsContent = generateIpfsTokenContent({
          tokenId,
          htmlContent: tokenContent.content,
          address: nftId,
        })
        const filesToUpload = [ipfsContent]
        const uris = await upload({ data: filesToUpload })
        const firstUri = uris[0]
        if (firstUri) {
          const tokenContentUpdateTx = sx1555NFTContract.prepare(
            'setTokenUri',
            [tokenId, firstUri]
          )
          txs.push(tokenContentUpdateTx)
        }
      }
    }

    console.log(txs)

    const receipt = await smartAccount?.send({
      transactions: await resolveAllThirdwebTransactions(txs),
    })

    console.log(receipt)
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
                onClick={() => updateCurrEditableTokenId(null)}
              >
                {nft.name}
              </StyledLink>
            }
            {indexPages.length > 0 &&
              indexPages.map(indexPage => (
                <StyledLink
                  to={''}
                  $isActive={currEditableTokenId === indexPage.tokenId}
                  style={{ cursor: 'pointer' }}
                  key={indexPage.tokenId}
                  onClick={() => updateCurrEditableTokenId(indexPage.tokenId)}
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
              <Button onClick={handleMerge}>
                {t('merge', { ns: 'buttons' })}
              </Button>
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
