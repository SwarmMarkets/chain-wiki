import Text from 'src/components/ui/Text'
import Flex from 'src/components/ui/Flex'
import { ChildrenProp } from 'src/shared/types/common-props'
import Box from '../ui/Box'

interface SettingCardProps extends ChildrenProp {
  description: string
  title: string
}

const SettingCard: React.FC<SettingCardProps> = ({
  description,
  title,
  children,
}) => {
  return (
    <Flex flexGrow={1} flexDirection={'column'}>
      <Text.h2 mb={2}>{title}</Text.h2>
      <Box maxWidth={700}>
        <Text.p lineHeight='1.3' color='gray' mb={3}>
          {description}
        </Text.p>
      </Box>

      {children}
    </Flex>
  )
}
export default SettingCard
