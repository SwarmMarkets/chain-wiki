import { VoteProposal } from 'src/shared/types/vote-proposal'
import { verifyVoteProposalValid } from 'src/shared/utils'
import { useState } from 'react'
import { useIpfsDownload } from '../web3/useIpfsDownload'

const useVoteProposal = () => {
  const [result, setResult] = useState<VoteProposal>()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const { download } = useIpfsDownload()

  const getProposal = async (proposalHash: string) => {
    try {
      setError(null)
      setLoading(true)

      const res = await download<VoteProposal>(proposalHash)
      if (!res) {
        throw Error('Proposal not find')
      }

      verifyVoteProposalValid(res)

      setResult(res)
      return res
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e?.message)
        console.log(e?.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return {
    getProposal,
    result,
    error,
    loading,
  }
}

export default useVoteProposal
