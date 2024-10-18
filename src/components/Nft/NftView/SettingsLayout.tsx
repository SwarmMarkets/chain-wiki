import Text from '@src/components/ui/Text'
import { StyledRolesDescription } from '../styled-components'
import Flex from '@src/components/ui/Flex'
import { ChildrenProp } from '@src/shared/types/common-props'

interface SettingsLayoutProps extends ChildrenProp {
  description: string
  title: string
}

export const SettingsLayout: React.FC<SettingsLayoutProps> = ({
  description,
  title,
  children,
}) => {
  return (
    <Flex flexGrow={1} flexDirection={'column'}>
      <Text.h2 mb={2}>{title}</Text.h2>
      <StyledRolesDescription mb={3}>{description}</StyledRolesDescription>
      {children}
    </Flex>
  )
}
