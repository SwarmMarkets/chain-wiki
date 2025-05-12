import Flex from 'src/components/ui/Flex'
import { ChildrenProp } from 'src/shared/types/common-props'
import Card from '../ui/Card'

interface SettingCardProps extends ChildrenProp {
  description: React.ReactNode
  subtitle?: string
  title: string
}

const SettingCard: React.FC<SettingCardProps> = ({
  description,
  subtitle,
  title,
  children,
}) => {
  return (
    <Flex flexGrow={1} flexDirection={'column'}>
      <div className='flex flex-col gap-3'>
        <h3 className='text-main-accent typo-title3 font-semibold'>{title}</h3>
        <Card className='flex flex-col gap-2'>
          {subtitle && (
            <h4 className='text-main-accent typo-title2 font-semibold'>
              {subtitle}
            </h4>
          )}
          <div>{description}</div>
          {children}
        </Card>
      </div>
    </Flex>
  )
}
export default SettingCard
