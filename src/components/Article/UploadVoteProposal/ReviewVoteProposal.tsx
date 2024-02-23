import Button from '@src/components/ui/Button/Button'
import Flex from '@src/components/ui/Flex'
import Icon from '@src/components/ui/Icon'
import Text from '@src/components/ui/Text'
import useToken from '@src/hooks/subgraph/useToken'
import { VoteProposal } from '@src/shared/types/vote-proposal'
import { convertUnixToLocaleString } from '@src/shared/utils'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'styled-components'
import {
  StepBack,
  VoteProposalVariant,
  VoteProposalWrap,
} from './styled-components'
import ExplorerLink from '@src/components/common/ExplorerLink'

interface ReviewVoteProposalProps {
  voteProposal: VoteProposal
  articleId: string
  backStep(): void
}

const ReviewVoteProposal: React.FC<ReviewVoteProposalProps> = ({
  voteProposal,
  articleId,
  backStep,
}) => {
  const { t } = useTranslation('article', { keyPrefix: 'reviewProposal' })
  const { token } = useToken(articleId)
  const theme = useTheme()

  const { data, address } = voteProposal

  const startDate = convertUnixToLocaleString(data.message.start)
  const endDate = convertUnixToLocaleString(data.message.end)
  const creationDate = convertUnixToLocaleString(data.message.timestamp)

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
        <Text.p mb={3}>{data.message.body}</Text.p>

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

      <Button width='100%'>{t('submit')}</Button>
    </Flex>
  )
}

export default ReviewVoteProposal
