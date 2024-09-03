import Card from '@src/components/ui/Card'
import Text from '@src/components/ui/Text'
import RoutePaths from '@src/shared/enums/routes-paths'
import { IpfsTokenContent } from '@src/shared/types/ipfs'
import { getTextContentFromHtml, limitString } from '@src/shared/utils'
import { generatePath } from 'react-router-dom'

interface TokenCardProps {
  tokenId: string
  name: string
  nftId: string
  content?: IpfsTokenContent
}

const TokenCard: React.FC<TokenCardProps> = ({
  tokenId,
  nftId,
  content,
  name,
}) => {
  return (
    <Card
      to={generatePath(RoutePaths.NFT + RoutePaths.TOKEN, {
        nftId,
        tokenId: tokenId,
      })}
      title={name}
    >
      {content && (
        <Text.p>
          {limitString(getTextContentFromHtml(content.htmlContent), 700)}
        </Text.p>
      )}
    </Card>
  )
}

export default TokenCard
