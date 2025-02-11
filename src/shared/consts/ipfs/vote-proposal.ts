import { VoteProposal } from 'src/shared/types/vote-proposal'

export const initialVoteProposal: VoteProposal = {
  address: '',
  sig: '',
  hash: '',
  data: {
    domain: {
      name: '',
      version: '',
    },
    types: {},
    message: {
      space: '',
      type: '',
      title: '',
      body: '',
      discussion: '',
      choices: [],
      start: 0,
      end: 0,
      snapshot: 0,
      plugins: '',
      app: '',
      from: '',
      timestamp: 0,
    },
  },
}
