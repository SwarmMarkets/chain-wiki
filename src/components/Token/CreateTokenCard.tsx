import { useTranslation } from 'react-i18next'
import Card from '../ui/Card'

import Text from '../ui/Text'
import styled, { useTheme } from 'styled-components'
import Icon from '../ui/Icon'
import Flex from '../ui/Flex'
import { useSX1155NFT } from '@src/hooks/contracts/useSX1155NFT'
import { useAddress } from '@thirdweb-dev/react'
import Box from '../ui/Box'

interface StyledCardProps {
  $disabled: boolean
}

const StyledCard = styled(Card)<StyledCardProps>`
  cursor: pointer;
  ${({ $disabled }) => $disabled && 'opacity: 0.4; filter: alpha(opacity=40);'}
`

interface CreateTokenCardProps {
  nftAddress: string
}

const CreateTokenCard: React.FC<CreateTokenCardProps> = ({ nftAddress }) => {
  const { t } = useTranslation('token')
  const theme = useTheme()

  const address = useAddress()
  const { call, txLoading } = useSX1155NFT(nftAddress)

  const createNFTToken = () => {
    if (!address) return
    const to = address
    const amount = 1
    const tokenURI = ''
    const data = '0x'
    return call('mint', [to, amount, tokenURI, data])
  }

  const icon = txLoading ? 'loader' : 'plus'

  return (
    <>
      <StyledCard onClick={createNFTToken} $disabled={txLoading}>
        <Flex
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
          height='100%'
          $gap='5px'
        >
          <Box height={50}>
            <Icon
              name={icon}
              size={50}
              cursor='pointer'
              color={theme.palette.borderPrimary}
            />
          </Box>
          <Text mt={2} color={theme.palette.borderPrimary}>
            {t('addToken')}
          </Text>
        </Flex>
      </StyledCard>
    </>
  )
}

export default CreateTokenCard
