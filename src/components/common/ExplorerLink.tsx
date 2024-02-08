import { ChildrenProp } from "@src/shared/types/common-props"
import { ExplorerLinkType, getExplorerUrl } from "@src/shared/utils"
import { useChainId } from "@thirdweb-dev/react"
import styled, { useTheme } from "styled-components"
import Flex from "../ui/Flex"
import Icon from "../ui/Icon"

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

const ExplorerLink: React.FC<ExplorerLinkProps> = ({ type, hash, children }) => {
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

  return <StyledLink onClick={handleLinkClick}>
    <Flex $gap='5px' alignItems='center'>
      <Icon name='externalLink' color={theme.palette.linkPrimary} />
      {children}
    </Flex>
  </StyledLink>
}

export default ExplorerLink