import { VoteProposal } from '@src/shared/types/vote-proposal'
import { verifyVoteProposalValid } from '@src/shared/utils'
import { useStorage } from '@thirdweb-dev/react'
import { useState } from 'react'

const useVoteProposal = () => {
  const [result, setResult] = useState<VoteProposal>()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const storage = useStorage()

  const getProposal = async (proposalHash: string) => {
    try {
      setError(null)
      setLoading(true)

      const res: VoteProposal | undefined = await storage?.downloadJSON(
        proposalHash
      )
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
