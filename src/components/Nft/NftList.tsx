import RoutePaths from '@src/shared/enums/routes-paths'
import { NFTQueryFullData } from '@src/shared/types/ipfs'
import React from 'react'
import { generatePath } from 'react-router-dom'
import styled from 'styled-components'
import AddNftCard from './AddNftCard'
import NftCard from './NftCard'
import NftSkeletonList from './NftSkeletonList'
import { StyledLink } from './styled-components'

interface NftListProps {
  loading: boolean
  nfts?: NFTQueryFullData[] | null
  addNftCard?: boolean
  showRole?: boolean
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-template-rows: minmax(250px, 1fr);
  box-sizing: border-box;
  gap: 20px;
`

const NftList: React.FC<NftListProps> = ({
  loading,
  nfts,
  addNftCard,
  showRole,
}) => {
  if (loading) {
    return <NftSkeletonList />
  }

  return (
    <>
      <Wrapper>
        {addNftCard && <AddNftCard />}
        {nfts?.map(nft => (
          <StyledLink
            to={generatePath(RoutePaths.PROJECT, { nftId: nft.id })}
            key={nft.id}
          >
            <NftCard nft={nft} showRole={showRole} />
          </StyledLink>
        ))}
      </Wrapper>
    </>
  )
}

export default NftList
