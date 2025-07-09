import ExplorerLink from 'src/components/common/ExplorerLink'
import Icon from 'src/components/ui-kit/Icon/Icon'
import { IpfsVoteProposal } from 'src/shared/utils/ipfs/types'
import { VoteProposal } from 'src/shared/types/vote-proposal'
import { convertUnixToLocaleString } from 'src/shared/utils'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import UpdateTokenContentButton from 'src/components/UpdateContent/UpdateTokenContentButton'
import useFullTokenIdParam from 'src/hooks/useFullTokenIdParam'
import Card from 'src/components/ui-kit/Card'
import Button from 'src/components/ui-kit/Button/Button'

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
  const { t } = useTranslation('token', { keyPrefix: 'reviewProposal' })

  const fullTokenId = useFullTokenIdParam()

  const { data, address, hash } = voteProposal

  const startDate = convertUnixToLocaleString(data.message.start)
  const endDate = convertUnixToLocaleString(data.message.end)
  const creationDate = convertUnixToLocaleString(data.message.timestamp)

  const [nftId] = fullTokenId ? fullTokenId.split('-') : []

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
    <div className="flex flex-col items-start justify-between min-h-[300px] w-full max-w-lg p-4">
      <Button
        variant="text"
        onClick={backStep}
        className="flex items-center text-primary hover:underline mb-4 px-0 py-0 h-auto border-none"
      >
        <Icon name="chevronLeft" size={16} className="mr-1" />
        {t('stepBack')}
      </Button>

      <h2 className="text-2xl font-bold mb-4">{t('title')}</h2>

      <Card className="w-full mb-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{data.message.title}</h3>
        <p className="text-gray-700 mb-3 leading-relaxed">{data.message.body}</p>

        <p className="mb-2 font-medium">{`${t('proposal.choices')}:`}</p>
        <div className="flex flex-row gap-2 mb-3">
          {data.message.choices?.map(choice => (
            <div key={choice} className="border-2 border-gray-300 rounded-lg bg-white px-4 py-2 text-sm font-medium">
              {choice}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-1 mb-3 text-sm text-gray-600">
          <p>{`${t('proposal.startDate')}: ${startDate}`}</p>
          <p>{`${t('proposal.endDate')}: ${endDate}`}</p>
          <p>{`${t('proposal.creationDate')}: ${creationDate}`}</p>
        </div>

        <ExplorerLink type='address' hash={address}>
          {`${t('proposal.creator')}: ${address}`}
        </ExplorerLink>
      </Card>

      <UpdateTokenContentButton
        className="w-full mt-4"
        tokenAddress={fullTokenId}
        tokenContentToUpdate={{ voteProposal: proposal }}
        nftAddress={nftId}
        onSuccess={nextStep}
      >
        {t('submit')}
      </UpdateTokenContentButton>
    </div>
  )
}

export default ReviewVoteProposal
