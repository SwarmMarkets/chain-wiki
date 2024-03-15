import { initialVoteProposal } from './../consts/ipfs/vote-proposal'
import {
  IpfsTokenContent,
  IpfsAttestationContent,
  IpfsNftContent,
} from '../types/ipfs'
import { VoteProposal } from '../types/vote-proposal'
import { isObject } from './isObject'

const initialNftContent: IpfsNftContent = {
  name: '',
  address: '',
  htmlContent: '',
  indexPages: [],
}

const initialAttestationContent: IpfsAttestationContent = {
  htmlContent: '',
}

export const generateIpfsNftContent = (args: IpfsNftContent) => {
  const content: IpfsNftContent = {
    name: args.name,
    address: args.address,
    htmlContent: args.htmlContent,
    indexPages: args.indexPages,
  }

  return JSON.stringify(content)
}

export const generateIpfsTokenContent = (args: IpfsTokenContent) => {
  const content: IpfsTokenContent = {
    tokenId: args.tokenId,
    name: args.name,
    address: args.address,
    htmlContent: args.htmlContent,
    voteProposal: args.voteProposal,
  }

  return JSON.stringify(content)
}

export const generateIpfsAttestationContent = (
  args: IpfsAttestationContent
) => {
  const content: IpfsAttestationContent = {
    htmlContent: args.htmlContent,
  }

  return JSON.stringify(content)
}

export const verifyObjectKeys = <T extends object>(
  keys: string[],
  object: T = {} as T
) => {
  const isObjValid = Object.keys(object).every(key => keys.includes(key))
  if (!isObjValid) {
    throw Error('Keys does not satisfy Object keys')
  }
  return isObjValid
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const verifyObjectKeysDeep = <T extends { [key: string]: any }>(
  validObject: T,
  checkObject: T
): boolean => {
  const validKeys = Object.keys(validObject).sort()
  const checkKeys = Object.keys(checkObject).sort()

  for (let i = 0; i < validKeys.length; i++) {
    const key = validKeys[i]
    const validValue = validObject[key]
    const checkValue = checkObject[key]

    if (checkKeys[i] !== key) {
      throw Error('Object is invalid')
    }

    const areObjects = isObject(validValue) && isObject(checkValue)

    if (
      areObjects &&
      !verifyObjectKeysDeep(
        validValue as Record<string, unknown>,
        (checkValue as Record<string, unknown>) ||
          (!areObjects && validValue !== checkValue)
      )
    ) {
      throw Error('Object is invalid')
    }
  }

  return true
}

export const verifyVoteProposalValid = (proposal: VoteProposal) => {
  try {
    return verifyObjectKeysDeep(initialVoteProposal, proposal)
  } catch {
    throw Error('Proposal invalid. Please check your proposal content.')
  }
}

export const verifyNftValid = (project: IpfsNftContent) => {
  try {
    return verifyObjectKeysDeep(initialNftContent, project)
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
export const parseIpfsNftContent = (content: string): IpfsNftContent => {
  try {
    const parsedContent = JSON.parse(content)
    const validKeys = Object.keys(initialNftContent)
    verifyObjectKeysDeep(validKeys, parsedContent)
    return parsedContent
  } catch {
    throw Error('Invalid JSON format')
  }
}
