import { ChildrenProp } from '@src/shared/types/common-props'
import { ExplorerLinkType, getExplorerUrl } from '@src/shared/utils'
import { useChainId } from '@thirdweb-dev/react'
import styled, { useTheme } from 'styled-components'
import Flex from '../ui/Flex'
import Icon from '../ui/Icon'
import { MouseEvent, useState } from 'react'
import Box from '../ui/Box'

interface ExplorerLinkProps extends ChildrenProp {
  type: ExplorerLinkType
  hash?: string
  iconSize?: number
  clickIcon?: boolean
}

export const StyledLink = styled.a`
  color: ${({ theme }) => theme.palette.linkPrimary};
  cursor: pointer;
  font-weight: 500;
  transition: color 0.2s ease, transform 0.2s ease, margin-left 0.2s ease;
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.palette.linkPrimaryAccent};
  }
`

const ExplorerLink: React.FC<ExplorerLinkProps> = ({
  type,
  hash,
  iconSize,
  children,
  clickIcon = true,
}) => {
  const [showCheckmark, setShowCheckmark] = useState(false)
  const chainId = useChainId()
  const theme = useTheme()

  const iconSizeWithDefault = iconSize || 20
  const explorerUrl = getExplorerUrl({
    type,
    chainId,
    hash,
  })

  const handleCopyClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    e.preventDefault()
    if (hash) {
      navigator.clipboard.writeText(hash)
      setShowCheckmark(true)
      setTimeout(() => {
        setShowCheckmark(false)
      }, 1000)
    }
  }

  return (
    <Flex alignItems='center' $gap='5px'>
      {clickIcon && (
        <Box width={iconSizeWithDefault}>
          {!showCheckmark ? (
            <Icon
              cursor='pointer'
              size={iconSizeWithDefault}
              onClick={handleCopyClick}
              name='copy'
              color={theme.palette.linkPrimary}
            />
          ) : (
            <Icon
              size={iconSizeWithDefault}
              name='checkmark'
              color={theme.palette.gray}
            />
          )}
        </Box>
      )}
      <Box width={iconSizeWithDefault}>
        <Icon
          onClick={() => window.open(explorerUrl, '_blank')}
          cursor='pointer'
          name='externalLink'
          size={iconSizeWithDefault}
          color={theme.palette.linkPrimary}
        />
      </Box>
      <StyledLink href={explorerUrl} target='_blank' rel='noopener noreferrer'>
        {children}
      </StyledLink>
    </Flex>
  )
}

export default ExplorerLink
