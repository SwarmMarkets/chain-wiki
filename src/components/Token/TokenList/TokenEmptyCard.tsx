import RequirePermissions from 'src/components/common/RequirePermissions'
import Button from 'src/components/ui/Button/Button'
import Card from 'src/components/ui/Card'
import Flex from 'src/components/ui/Flex'
import Text from 'src/components/ui/Text'
import { TokenTabs } from 'src/shared/enums'
import RoutePaths from 'src/shared/enums/routes-paths'
import { useTranslation } from 'react-i18next'
import { Link, generatePath } from 'react-router-dom'
import { useTheme } from 'styled-components'

interface TokenEmptyCardProps {
  tokenId: string
  nftId: string
}

const TokenEmptyCard: React.FC<TokenEmptyCardProps> = ({ tokenId, nftId }) => {
  const { t } = useTranslation('token')
  const theme = useTheme()

  return (
    <Card>
      <Flex justifyContent='space-between' alignItems='center'>
        <Text.p color={theme.palette.borderPrimary}>
          {t('messages.newToken')}
        </Text.p>
        <RequirePermissions canUpdateContent nftAddress={nftId}>
          <Link
            to={`${generatePath(RoutePaths.NFT + RoutePaths.TOKEN, {
              nftId,
              tokenId: tokenId,
            })}?tab=${TokenTabs.EDIT}`}
          >
            <Button>{t('updateToken')}</Button>
          </Link>
        </RequirePermissions>
      </Flex>
    </Card>
  )
}

export default TokenEmptyCard
