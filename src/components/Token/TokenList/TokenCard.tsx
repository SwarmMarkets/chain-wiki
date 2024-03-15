import Card from '@src/components/ui/Card'
import Text from '@src/components/ui/Text'
import RoutePaths from '@src/shared/enums/routes-paths'
import { IpfsTokenContent } from '@src/shared/types/ipfs'
import { getTextContentFromHtml, limitString } from '@src/shared/utils'
import { generatePath } from 'react-router-dom'
import TokenEmptyCard from './TokenEmptyCard'

interface TokenCardProps {
  tokenId: string
  nftId: string
  content?: IpfsTokenContent
}

const TokenCard: React.FC<TokenCardProps> = ({ tokenId, nftId, content }) => {
  if (content?.error || !content) {
    return <TokenEmptyCard tokenId={tokenId} nftId={nftId} />
  }

  return (
    <Card
      to={generatePath(RoutePaths.NFT + RoutePaths.TOKEN, {
        nftId,
        tokenId: tokenId,
      })}
      title={content.name}
    >
      <Text.p>
        {limitString(getTextContentFromHtml(content.htmlContent), 700)}
      </Text.p>
    </Card>
  )
}

export default TokenCard
