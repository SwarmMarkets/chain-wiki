import { VoteProposal } from '../../types/vote-proposal'
import { verifyObjectKeysDeep } from '../json'
import { initialVoteProposal } from './../../consts/ipfs/vote-proposal'
import {
  initialAttestationContent,
  initialIndexPagesContent,
  initialNftContent,
} from './consts'
import {
  IpfsAttestationContent,
  IpfsIndexPagesContent,
  IpfsNftContent,
} from './types'

export const verifyVoteProposalValid = (proposal: VoteProposal) => {
  try {
    return verifyObjectKeysDeep(initialVoteProposal, proposal)
  } catch {
    throw Error('Proposal invalid. Please check your proposal content.')
  }
}

export const verifyNftValid = (content: IpfsNftContent) => {
  try {
    return verifyObjectKeysDeep(initialNftContent, content)
  } catch {
    throw Error('Nft content is invalid.')
  }
}

export const verifyAttestationValid = (attestation: IpfsAttestationContent) => {
  try {
    return verifyObjectKeysDeep(initialAttestationContent, attestation)
  } catch {
    throw Error('Attestation content is invalid.')
  }
}
export const verifyIndexPagesValid = (content: IpfsIndexPagesContent) => {
  try {
    return verifyObjectKeysDeep(initialIndexPagesContent, content)
  } catch {
    throw Error('Index pages content is invalid.')
  }
}
