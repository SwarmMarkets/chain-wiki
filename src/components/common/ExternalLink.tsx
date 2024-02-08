import { ChildrenProp } from "@src/shared/types/common-props"
import { ExplorerLinkType, getExplorerUrl } from "@src/shared/utils"
import { useChainId } from "@thirdweb-dev/react"
import styled, { useTheme } from "styled-components"
import Flex from "../ui/Flex"
import Icon from "../ui/Icon"

interface ExternalLinkProps extends ChildrenProp {
  type: ExplorerLinkType
  hash?: string
}

export const StyledLink = styled.span`
  color: ${({ theme }) => theme.palette.linkPrimary};
  &:hover {
    text-decoration: underline;
  }
`

const ExternalLink: React.FC<ExternalLinkProps> = ({ type, hash, children }) => {
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

export default ExternalLink