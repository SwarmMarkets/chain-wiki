import { TokensQueryFullData } from '@src/shared/types/ipfs'
import { useParams } from 'react-router-dom'
import RequirePermissions from '../../common/RequirePermissions'
import Flex from '../../ui/Flex'
import Text from '@src/components/ui/Text'
import TokenCardSkeleton from '../TokenCardSkeleton'
import CreateTokenCard from '../CreateTokenCard'
import TokenCard from './TokenCard'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'styled-components'

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
  const { nftId = '' } = useParams()
  const noTokens = !tokens?.length && !loading
  const theme = useTheme()

  return (
    <Flex flexDirection='column' $gap='10px'>
      <RequirePermissions canCreateToken nftAddress={nftId}>
        <CreateTokenCard nftAddress={nftAddress} />
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
          nftId={nftId}
          name={token.name}
          content={token.ipfsContent}
        />
      ))}

      {loading &&
        [...new Array(5)].map((_, index) => <TokenCardSkeleton key={index} />)}
    </Flex>
  )
}

export default TokenList
