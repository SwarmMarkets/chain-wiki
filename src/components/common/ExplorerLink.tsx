import { ChildrenProp } from 'src/shared/types/common-props'
import { ExplorerLinkType, getExplorerUrl } from 'src/shared/utils'
import { useState, MouseEvent } from 'react'
import Icon from '../ui-kit/Icon/Icon'
import clsx from 'clsx'
import useActiveOrDefaultChain from 'src/hooks/web3/useActiveOrDefaultChain'

interface ExplorerLinkProps extends ChildrenProp {
  type: ExplorerLinkType
  hash?: string
  iconSize?: number
  className?: string
}

const ExplorerLink: React.FC<ExplorerLinkProps> = ({
  type,
  hash,
  iconSize,
  className,
  children,
}) => {
  const [showCheckmark, setShowCheckmark] = useState(false)
  const { id: chainId } = useActiveOrDefaultChain()

  const iconSizeWithDefault = iconSize || 16
  const explorerUrl = getExplorerUrl({ type, chainId, hash })

  const handleCopyClick = (e: MouseEvent<SVGElement>) => {
    e.stopPropagation()
    e.preventDefault()
    if (hash) {
      navigator.clipboard.writeText(hash)
      setShowCheckmark(true)
      setTimeout(() => setShowCheckmark(false), 1000)
    }
  }

  return (
    <div
      className={clsx(
        'flex items-center gap-2 group hover:text-primary-accent transition-colors duration-200',
        className
      )}
    >
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
