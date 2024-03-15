import { useTranslation } from 'react-i18next'

import { SuccessProps } from './types'
import Flex from '../Flex'
import Icon from '../Icon'
import Text from '../Text'
import Box from '../Box'
import Button from '../Button/Button'

export type ContentType = 'nft' | 'token'

interface SuccessContentProps extends Partial<SuccessProps> {
  onClick(): void
}

const SuccessContent: React.FC<SuccessContentProps> = ({
  title = 'Success',
  description = '',
  onClick,
}) => {
  const { t } = useTranslation('common', { keyPrefix: 'successModal' })

  return (
    <Flex
      flexDirection='column'
      justifyContent='space-between'
      alignItems='center'
      minHeight='inherit'
    >
      <Icon name='checkbox' color='green' size={60} mb={4} />
      {title && <Text.h1 mb={3}>{title}</Text.h1>}

      {description && (
        <Box maxWidth='400px'>
          <Text.p fontSize='16px' mb={4} textAlign='center' lineHeight='1.2'>
            {description}
          </Text.p>
        </Box>
      )}

      <Button onClick={onClick} width='100%'>
        {t('done')}
      </Button>
    </Flex>
  )
}

export default SuccessContent
