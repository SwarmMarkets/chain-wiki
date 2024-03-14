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
  children,
}) => {
  const [showCheckmark, setShowCheckmark] = useState(false)
  const chainId = useChainId()
  const theme = useTheme()

  const handleLinkClick = () => {
    const explorerUrl = getExplorerUrl({
      type,
      chainId,
      hash,
    })
    window.open(explorerUrl, '_blank')
  }

  const handleCopyClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    hash && navigator.clipboard.writeText(hash)
    setShowCheckmark(true)
    setTimeout(() => {
      setShowCheckmark(false)
    }, 1000)
  }

  return (
    <Flex alignItems='center' $gap='2px'>
      <Box width='20px'>
        {!showCheckmark ? (
          <Icon
            cursor='pointer'
            size={20}
            onClick={handleCopyClick}
            name='copy'
            color={theme.palette.linkPrimary}
          />
        ) : (
          <Icon size={20} name='checkmark' color={theme.palette.gray} />
        )}
      </Box>

      <StyledLink onClick={handleLinkClick}>
        <Flex $gap='5px' alignItems='center'>
          <Icon
            cursor='pointer'
            name='externalLink'
            size={20}
            color={theme.palette.linkPrimary}
          />
          {children}
        </Flex>
      </StyledLink>
    </Flex>
  )
}

export default ExplorerLink
