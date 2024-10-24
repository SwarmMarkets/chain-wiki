import Text from '@src/components/ui/Text'
import { TokensQueryFullData } from '@src/shared/utils/ipfs/types'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'styled-components'
import RequirePermissions from '../../common/RequirePermissions'
import Flex from '../../ui/Flex'
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
  const theme = useTheme()

  return (
    <Flex flexDirection='column' $gap='10px'>
      <RequirePermissions canCreateToken nftAddress={nftAddress}>
        <CreateTokenCard />
      </RequirePermissions>

      {noTokens && (
        <Text.p
          mt='22px'
          textAlign='center'
          color={theme.palette.gray}
          fontWeight={theme.fontWeights.medium}
        >
          {t('messages.noTokens')}
        </Text.p>
      )}

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
    </Flex>
  )
}

export default TokenList
