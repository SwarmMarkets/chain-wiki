import RoutePaths from '@src/shared/enums/routes-paths'
import React from 'react'
import { generatePath } from 'react-router-dom'
import styled from 'styled-components'
import NftCard from './NftCard'
import NftSkeletonList from './NftSkeletonList'
import { StyledLink } from './styled-components'
import { NfTsQuery } from '@src/queries/gql/graphql'

interface NftListProps {
  loading: boolean
  nfts?: NfTsQuery['nfts'] | null

  showRole?: boolean
  skeletonLength?: number
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

  showRole,
  skeletonLength,
}) => {
  return (
    <>
      <Wrapper>
        {loading ? (
          <NftSkeletonList skeletonLength={skeletonLength} />
        ) : (
          nfts?.map(nft => (
            <StyledLink
              to={generatePath(RoutePaths.NFT, { nftId: nft.id })}
              key={nft.id}
            >
              <NftCard nft={nft} showRole={showRole} />
            </StyledLink>
          ))
        )}
      </Wrapper>
    </>
  )
}

export default NftList
