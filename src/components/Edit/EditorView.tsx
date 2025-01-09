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
} from 'src/shared/utils'
import { useTheme } from 'styled-components'

interface EditorViewProps {
  nft: NFTWithMetadata
  content: string
}

const EditorView: React.FC<EditorViewProps> = ({ nft, content }) => {
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
    editedNft,
    editedTokens,
    getEditedTokenById,
    updateOrCreateEditedToken,
    updateNft,
  } = useEditingStore()

  const updateContent = (content: string) => {
    if (currEditableToken) {
      updateOrCreateEditedToken({
        id: currEditableToken.id,
        name:
          getEditedTokenById(currEditableToken.id)?.name ||
          currEditableToken.name,
        content,
      })
    } else {
      updateNft({ id: nftId, name: editedNft?.name || nft.name, content })
    }
  }

  const handleMerge = async () => {
    setLoading(true)
    const txs: Transaction[] = []
    if (editedNft) {
      const ipfsUri = await uploadContent({
        address: nftId,
        htmlContent: editedNft.content,
      })
      if (ipfsUri) {
        const nftContentUpdateTx = sx1555NFTContract.prepare('setContractUri', [
          JSON.stringify({ uri: ipfsUri, name: editedNft.name }),
        ])
        txs.push(nftContentUpdateTx)
      }
    }
    if (editedTokens.length > 0) {
      for (const editedToken of editedTokens) {
        const tokenId = +editedToken.id.split('-')[1]
        const ipfsContent = generateIpfsTokenContent({
          tokenId,
          htmlContent: editedToken.content,
          address: nftId,
        })
        const filesToUpload = [ipfsContent]
        const uris = await upload({ data: filesToUpload })
        const firstUri = uris[0]
        if (firstUri) {
          const tokenContentUpdateTx = sx1555NFTContract.prepare(
            'setTokenUri',
            [tokenId, JSON.stringify({ uri: firstUri, name: editedToken.name })]
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
