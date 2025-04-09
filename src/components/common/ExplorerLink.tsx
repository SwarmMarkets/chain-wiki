import { ChildrenProp } from 'src/shared/types/common-props'
import { ExplorerLinkType, getExplorerUrl } from 'src/shared/utils'
import { useChainId } from '@thirdweb-dev/react'
import { useState, MouseEvent } from 'react'
import Icon from '../ui-kit/Icon/Icon'

interface ExplorerLinkProps extends ChildrenProp {
  type: ExplorerLinkType
  hash?: string
  iconSize?: number
}

const ExplorerLink: React.FC<ExplorerLinkProps> = ({
  type,
  hash,
  iconSize,
  children,
}) => {
  const [showCheckmark, setShowCheckmark] = useState(false)
  const chainId = useChainId()

  const iconSizeWithDefault = iconSize || 16
  const explorerUrl = getExplorerUrl({ type, chainId, hash })

  const handleCopyClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    e.preventDefault()
    if (hash) {
      navigator.clipboard.writeText(hash)
      setShowCheckmark(true)
      setTimeout(() => setShowCheckmark(false), 1000)
    }
  }

  return (
    <div className='flex items-center gap-2 group hover:text-primary-accent transition-colors duration-200'>
      <div style={{ width: iconSizeWithDefault }}>
        {!showCheckmark ? (
          <Icon
            cursor='pointer'
            className='text-primary hover:text-primary-accent'
            size={iconSizeWithDefault}
            onClick={handleCopyClick}
            name='copy'
          />
        ) : (
          <Icon
            cursor='pointer'
            className='group-hover:text-primary-accent'
            size={iconSizeWithDefault}
            name='checkmark'
          />
        )}
      </div>
      <div style={{ width: iconSizeWithDefault }}>
        <Icon
          className='text-primary group-hover:text-primary-accent'
          cursor='pointer'
          size={iconSizeWithDefault}
          onClick={() => window.open(explorerUrl, '_blank')}
          name='externalLink'
        />
      </div>
      <a
        href={explorerUrl}
        target='_blank'
        rel='noopener noreferrer'
        className='text-primary transition-colors duration-200 group-hover:text-primary-accent cursor-pointer'
      >
        {children}
      </a>
    </div>
  )
}

export default ExplorerLink
