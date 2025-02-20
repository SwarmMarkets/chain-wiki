import { TokensQueryFullData } from 'src/shared/utils/ipfs/types'
import { useTranslation } from 'react-i18next'
import RequirePermissions from '../../common/RequirePermissions'
import CreateTokenCard from '../CreateTokenCard'
import TokenCardSkeleton from '../TokenCardSkeleton'
import TokenCard from './TokenCard'

interface TokenListProps {
  tokens: TokensQueryFullData[] | null
  nftAddress: string
  loading?: boolean
}

const TokenList: React.FC<TokenListProps> = ({
  tokens,
  nftAddress,
  loading,
}) => {
  const { t } = useTranslation('token')
  const noTokens = !tokens?.length && !loading

  return (
    <div className='flex flex-col gap-2.5'>
      <RequirePermissions canCreateToken nftAddress={nftAddress}>
        <CreateTokenCard />
      </RequirePermissions>

      {noTokens && <p className='text-center'>{t('messages.noTokens')}</p>}

      {tokens?.map(token => (
        <TokenCard
          key={token.id}
          tokenId={token.id}
          nftId={nftAddress}
          name={token.name || token.id}
          content={token.ipfsContent}
        />
      ))}

      {loading &&
        [...new Array(5)].map((_, index) => <TokenCardSkeleton key={index} />)}
    </div>
  )
}

export default TokenList
