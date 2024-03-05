import React from 'react'
import Flex from '../ui/Flex'
import Icon from '../ui/Icon'
import Text from '../ui/Text'
import { useTheme } from 'styled-components'

interface ContentMissingProps {
  message: string
}

const ContentMissing: React.FC<ContentMissingProps> = ({ message }) => {
  const theme = useTheme()

  return (
    <Flex flexDirection='column' justifyContent='center' alignItems='center'>
      <Icon name='empty' size={200} color={theme.palette.gray} />
      <Text fontSize={theme.fontSizes.large} color={theme.palette.gray}>
        {message}
      </Text>
    </Flex>
  )
}

export default ContentMissing
