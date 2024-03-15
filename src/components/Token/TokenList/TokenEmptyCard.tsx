import RequirePermissions from '@src/components/common/RequirePermissions'
import Button from '@src/components/ui/Button/Button'
import Card from '@src/components/ui/Card'
import Flex from '@src/components/ui/Flex'
import Icon from '@src/components/ui/Icon'
import Text from '@src/components/ui/Text'
import { TokenTabs } from '@src/shared/enums'
import RoutePaths from '@src/shared/enums/routes-paths'
import { useTranslation } from 'react-i18next'
import { Link, generatePath } from 'react-router-dom'
import { useTheme } from 'styled-components'

interface TokenEmptyCardProps {
  tokenId: string
  nftId: string
}

const TokenEmptyCard: React.FC<TokenEmptyCardProps> = ({ tokenId, nftId }) => {
  const { t } = useTranslation(['errors', 'token'])
  const theme = useTheme()

  return (
    <Card>
      <Flex justifyContent='space-between'>
        <Flex $gap='8px' alignItems='center'>
          <Icon name='empty' size={30} color={theme.palette.borderPrimary} />
          <Text.p color={theme.palette.borderPrimary}>
            {t('token.pendingDetails')}
          </Text.p>
        </Flex>
        <RequirePermissions canUpdateContent nftAddress={nftId}>
          <Link
            to={`${generatePath(RoutePaths.NFT + RoutePaths.TOKEN, {
              nftId,
              tokenId: tokenId,
            })}?tab=${TokenTabs.EDIT}`}
          >
            <Button>{t('updateToken', { ns: 'token' })}</Button>
          </Link>
        </RequirePermissions>
      </Flex>
    </Card>
  )
}

export default TokenEmptyCard
