import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Content from 'src/components/Content'
import EditIndexPages from 'src/components/Edit/EditIndexPages'
import EditorView from 'src/components/Edit/EditorView'
import { SideContentWrap } from 'src/components/Nft/styled-components'
import NftContentSkeleton from 'src/components/Token/TokenContentSkeleton'
import Box from 'src/components/ui/Box'
import Flex from 'src/components/ui/Flex'
import useNFT from 'src/hooks/subgraph/useNFT'
import useTokens from 'src/hooks/subgraph/useTokens'
import { unifyAddressToId } from 'src/shared/utils'

const EditPage = () => {
  const { nftId = '' } = useParams()
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
      <EditIndexPages nft={nft} tokens={fullTokens} />
      <EditorView nft={nft} tokens={fullTokens} />
      <SideContentWrap>
        <Content contentElem={contentElem} />
      </SideContentWrap>
    </Flex>
  )
}

export default EditPage
