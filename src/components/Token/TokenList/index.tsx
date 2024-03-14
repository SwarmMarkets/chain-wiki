import { TokensQueryFullData } from '@src/shared/types/ipfs'
import { useParams } from 'react-router-dom'
import ContentMissing from '../../common/ContentMissing'
import RequirePermissions from '../../common/RequirePermissions'
import Flex from '../../ui/Flex'
import TokenCardSkeleton from '../TokenCardSkeleton'
import CreateTokenCard from '../CreateTokenCard'
import TokenCard from './TokenCard'

interface TokenListProps {
  tokens: TokensQueryFullData[] | null
  projectAddress: string
  loading?: boolean
}

const TokenList: React.FC<TokenListProps> = ({
  tokens,
  projectAddress,
  loading,
}) => {
  const { projectId = '' } = useParams()

  const noContent = !loading && (tokens?.length === 0 || !tokens)

  return (
    <Flex flexDirection='column' $gap='10px'>
      <RequirePermissions canCreateToken projectAddress={projectId}>
        <CreateTokenCard projectAddress={projectAddress} />
      </RequirePermissions>
      {noContent ? (
        <ContentMissing message='Tokens missing' />
      ) : (
        tokens?.map(token => (
          <TokenCard
            key={token.id}
            tokenId={token.id}
            projectId={projectId}
            content={token.ipfsContent}
          />
        ))
      )}

      {loading &&
        [...new Array(5)].map((_, index) => <TokenCardSkeleton key={index} />)}
    </Flex>
  )
}

export default TokenList
