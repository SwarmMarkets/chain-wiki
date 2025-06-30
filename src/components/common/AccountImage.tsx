import clsx from 'clsx'
import { Blobbie } from 'thirdweb/react'

interface AccountImageProps {
  address: string | undefined
  size?: number
  className?: string
}

const AccountImage: React.FC<AccountImageProps> = ({
  address = '',
  size = 28,
  className,
}) => {
  return (
    <div className={clsx('overflow-hidden rounded-full', className)}>
      <Blobbie address={address} size={size} />
    </div>
  )
}

export default AccountImage
