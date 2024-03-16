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
  iconsPosition?: 'left' | 'right'
}

export const StyledLink = styled.span`
  color: ${({ theme }) => theme.palette.linkPrimary};
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`

const ExplorerLink: React.FC<ExplorerLinkProps> = ({
  type,
  hash,
  iconSize,
  children,
  iconsPosition = 'left',
}) => {
  const [showCheckmark, setShowCheckmark] = useState(false)
  const chainId = useChainId()
  const theme = useTheme()

  const iconSizeWithDefault = iconSize || 20
  const isIconsLeft = iconsPosition === 'left'

  const handleLinkClick = (e: MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation()
    e.preventDefault()
    const explorerUrl = getExplorerUrl({
      type,
      chainId,
      hash,
    })
    window.open(explorerUrl, '_blank')
  }

  const handleCopyClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    e.preventDefault()
    hash && navigator.clipboard.writeText(hash)
    setShowCheckmark(true)
    setTimeout(() => {
      setShowCheckmark(false)
    }, 1000)
  }

  return (
    <Flex alignItems='center' $gap='5px'>
      {!isIconsLeft && (
        <StyledLink onClick={handleLinkClick}>{children}</StyledLink>
      )}

      <Flex $gap='2px'>
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

        <Icon
          onClick={handleLinkClick}
          cursor='pointer'
          name='externalLink'
          size={iconSizeWithDefault}
          color={theme.palette.linkPrimary}
        />
      </Flex>

      {isIconsLeft && (
        <StyledLink onClick={handleLinkClick}>{children}</StyledLink>
      )}
    </Flex>
  )
}

export default ExplorerLink
