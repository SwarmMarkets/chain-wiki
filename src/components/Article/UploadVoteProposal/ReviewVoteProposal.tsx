import UpdateContentButton from '@src/components/UpdateContent'
import ExplorerLink from '@src/components/common/ExplorerLink'
import { useTokenContext } from '@src/components/providers/TokenContext'
import Flex from '@src/components/ui/Flex'
import Icon from '@src/components/ui/Icon'
import Text from '@src/components/ui/Text'
import { IpfsVoteProposal } from '@src/shared/types/ipfs'
import { VoteProposal } from '@src/shared/types/vote-proposal'
import { convertUnixToLocaleString } from '@src/shared/utils'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'styled-components'
import {
  StepBack,
  VoteProposalVariant,
  VoteProposalWrap,
} from './styled-components'

interface ReviewVoteProposalProps {
  voteProposal: VoteProposal
  backStep(): void
  nextStep(): void
}

const ReviewVoteProposal: React.FC<ReviewVoteProposalProps> = ({
  voteProposal,
  backStep,
  nextStep,
}) => {
  const { t } = useTranslation('article', { keyPrefix: 'reviewProposal' })

  const token = useTokenContext()
  const theme = useTheme()

  const { data, address, hash } = voteProposal

  const startDate = convertUnixToLocaleString(data.message.start)
  const endDate = convertUnixToLocaleString(data.message.end)
  const creationDate = convertUnixToLocaleString(data.message.timestamp)

  const [nftId, tokenId] = token?.id ? token.id.split('-') : []

  const htmlContent = token?.ipfsContent?.htmlContent || ''
  const proposal: IpfsVoteProposal = useMemo(() => {
    const { start, end, choices, title, body, timestamp, type, space } =
      data.message

    return {
      id: hash,
      space,
      type,
      title,
      body,
      choices: choices || [],
      start,
      end,
      timestamp,
    }
  }, [data.message, hash])

  return (
    <Flex
      py={2}
      px={2}
      flexDirection='column'
      alignItems='flex-start'
      justifyContent='space-between'
      minHeight='inherit'
    >
      <StepBack onClick={backStep} mb={3}>
        <Icon
          name='chevronLeft'
          color={theme.palette.linkPrimary}
          size={13}
          mr={1}
        />
        {t('stepBack')}
      </StepBack>

      <Text.h2 mb={3}>{t('title')}</Text.h2>

      <Text.p
        mb={3}
        lineHeight={1.3}
        fontSize={16}
        color={theme.palette.darkGray}
      >
        {t('description')}
      </Text.p>

      <VoteProposalWrap mb={3}>
        <Text.h3 color='nearBlack' mb={3}>
          {data.message.title}
        </Text.h3>
        <Text.p mb={3} lineHeight={1.5}>
          {data.message.body}
        </Text.p>

        <Text.p mb={2}>{`${t('proposal.choices')}:`}</Text.p>
        <Flex $gap='10px' mb={3}>
          {data.message.choices?.map(choice => (
            <VoteProposalVariant key={choice}>{choice}</VoteProposalVariant>
          ))}
        </Flex>

        <Flex $gap='10px' flexDirection='column' mb={3}>
          <Text.p>{`${t('proposal.startDate')}: ${startDate}`}</Text.p>
          <Text.p>{`${t('proposal.endDate')}: ${endDate}`}</Text.p>
          <Text.p>{`${t('proposal.creationDate')}: ${creationDate}`}</Text.p>
        </Flex>

        <ExplorerLink type='address' hash={address}>
          {`${t('proposal.creator')}: ${address}`}
        </ExplorerLink>
      </VoteProposalWrap>

      <UpdateContentButton
        width='100%'
        articleId={Number(tokenId)}
        contentType='article'
        content={htmlContent}
        voteProposal={proposal}
        projectAddress={nftId}
        onSuccess={nextStep}
      />
    </Flex>
  )
}

export default ReviewVoteProposal
