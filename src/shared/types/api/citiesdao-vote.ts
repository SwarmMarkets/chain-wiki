export enum CitiesdaoVoteStatus {
  statusSuccess = 'success',
  statusNoVotingPower = 'no_voting_power',
  statusUnknownProposal = 'unknown_proposal',
  statusUnknownError = 'unknown_error',
  statusVoteNotActive = 'vote_not_active',
}

export interface CitiesdaoVoteResponse {
  details: string
  status: CitiesdaoVoteStatus
}
