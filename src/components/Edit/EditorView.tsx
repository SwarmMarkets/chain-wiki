import { Transaction, useChainId, useStorageUpload } from '@thirdweb-dev/react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import EditorBox from 'src/components/Editor/EditorBox'
import Box from 'src/components/ui/Box'
import Button from 'src/components/ui/Button/Button'
import Flex from 'src/components/ui/Flex'
import Icon from 'src/components/ui/Icon'
import Text from 'src/components/ui/Text'
import { useSX1155NFT } from 'src/hooks/contracts/useSX1155NFT'
import useNFTUpdate from 'src/hooks/useNFTUpdate'
import useSmartAccount from 'src/services/safe-protocol-kit/useSmartAccount'
import { useEditingStore } from 'src/shared/store/editing-store'
import {
  generateIpfsTokenContent,
  getExplorerUrl,
  NFTWithMetadata,
  resolveAllThirdwebTransactions,
  TokensQueryFullData,
} from 'src/shared/utils'
import { useTheme } from 'styled-components'

interface EditorViewProps {
  nft: NFTWithMetadata
  tokens: TokensQueryFullData[] | null
  content: string
}

const EditorView: React.FC<EditorViewProps> = ({ nft, tokens, content }) => {
  const { t } = useTranslation('buttons')
  const { nftId = '' } = useParams()
  const theme = useTheme()
  const { smartAccount } = useSmartAccount()
  const { mutateAsync: upload } = useStorageUpload()
  const [loading, setLoading] = useState(false)

  const { contract: sx1555NFTContract } = useSX1155NFT(nftId)
  const { uploadContent } = useNFTUpdate(nftId)

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

  const {
    currEditableToken,
    nftContent,
    tokenContents,
    updateOrCreateTokenContent,
    updateNftContent,
  } = useEditingStore()

  const updateContent = (content: string) => {
    if (currEditableToken) {
      updateOrCreateTokenContent(currEditableToken.id, content)
    } else {
      updateNftContent(nftId, content)
    }
  }

  const handleMerge = async () => {
    setLoading(true)
    const txs: Transaction[] = []
    if (nftContent) {
      const ipfsUri = await uploadContent({
        address: nftId,
        htmlContent: nftContent.content,
      })
      if (ipfsUri) {
        const nftContentUpdateTx = sx1555NFTContract.prepare('setContractUri', [
          JSON.stringify({ uri: ipfsUri }),
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
            [tokenId, JSON.stringify({ uri: firstUri })]
          )
          txs.push(tokenContentUpdateTx)
        }
      }
    }

    console.log(txs)

    const receipt = await smartAccount?.send({
      transactions: await resolveAllThirdwebTransactions(txs),
    })

    setLoading(false)

    console.log(receipt)
  }

  return (
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
            {currEditableToken?.name || nft?.name}
          </Text.h1>
          <Flex $gap='10px' alignItems='center'>
            <Button onClick={handleMerge}>
              {loading ? 'Loading...' : t('merge', { ns: 'buttons' })}
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
      <EditorBox content={content} onChange={updateContent} />
    </Box>
  )
}

export default EditorView
