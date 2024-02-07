import { useTranslation } from 'react-i18next'
import Card from '../ui/Card'

import Text from '../ui/Text'
import styled, { useTheme } from 'styled-components'
import Icon from '../ui/Icon'
import Flex from '../ui/Flex'

const StyledCard = styled(Card)`
  cursor: pointer;
`

const CreateArticleCard: React.FC = () => {
  const { t } = useTranslation('article')
  const theme = useTheme()

  return (
    <>
      <StyledCard>
        <Flex
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
          height='100%'
          $gap='5px'
        >
          <Icon name='plus' size={50} color={theme.palette.borderPrimary} />
          <Text mt={2} color={theme.palette.borderPrimary}>{t('addArticle')}</Text>
        </Flex>
      </StyledCard>
    </>
  )
}

export default CreateArticleCard
