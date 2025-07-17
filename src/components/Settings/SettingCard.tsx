import { ChildrenProp } from 'src/shared/types/common-props'
import Card from '../ui-kit/Card'

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
    <div className='flex flex-col flex-grow'>
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
    </div>
  )
}

export default SettingCard
